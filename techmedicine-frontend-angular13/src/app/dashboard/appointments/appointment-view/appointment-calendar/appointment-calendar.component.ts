import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AppointmentModalComponent } from 'src/app/dashboard/appointments/appointment-modal/appointment-modal.component';
import { Medic } from 'src/app/dashboard/medics/models/medic';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Appointment } from '../../models/appointment';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentCalendarComponent implements OnInit, OnDestroy {
  loadPage: boolean = false;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: ptBrLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    height: 1000,
    dayMinWidth: 150,
    eventShortHeight: 40,
    stickyHeaderDates: true,
    allDaySlot: false,
    expandRows: true,
    slotMinTime: '08:00',
    slotMaxTime: '18:00',
    slotEventOverlap: false,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    },
    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '08:00',
        endTime: '12:00'
      },
      {
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '14:00',
        endTime: '18:00'
      }
    ],
    editable: true,
    eventConstraint: 'businessHours',
    eventDrop: this.eventDropUpdate.bind(this),
    eventClick: this.viewAppointment.bind(this),
    eventOverlap: false,
    eventMaxStack: 1,
    selectable: true,
    selectConstraint: 'businessHours',
    select: this.addAppointment.bind(this),
    selectAllow: this.maxSelectionAllowed.bind(this)
  };
  events: any[];
  appointment: Appointment;
  error: Subject<boolean> = new Subject();
  isCollapsed: boolean = true;
  filterSwitches: any = {
    opened: true,
    finished: false,
    cancelled: false
  };
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  filterMedic: Medic;
  filter: string;
  @ViewChild('appointmentModal', { static: true })
  appointmentModal?: AppointmentModalComponent;

  constructor(
    private appointmentService: AppointmentService,
    private dropdownService: DropdownService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { pagina: null },
      queryParamsHandling: 'merge'
    });
    this.fetchData();
    this.onRefresh();
  }

  ngOnDestroy(): void {
    this.appointmentModal.close();
  }

  private fetchData(): void {
    this.dropdownService.getMedics().subscribe({
      next: (medics: Medic[]) => {
        this.medics = medics.map((medic: any) => {
          medic.searchLabel = `${medic.name} ${medic.surname}`;
          return medic;
        });
      },
      complete: () => {
        this.medicsLoading = false;
      }
    });
  }

  onRefresh(): void | Observable<never> {
    this.appointmentService
      .findAllAsEvents()
      .pipe(
        catchError(() => {
          this.error.next(true);
          return of();
        })
      )
      .subscribe({
        next: (appointmentEvents: any[]) => {
          this.events = appointmentEvents;
          this.showData();
        },
        complete: () => {
          this.loadPage = true;
        }
      });
  }

  setFilterMedic(medic: Medic) {
    this.filterMedic = medic;
    this.showData();
  }

  showData(): void {
    let events: any[] = this.events;
    if (!this.filterSwitches.opened) {
      events = events.filter(
        (event: any) =>
          event.extendedProps.appointment.appointmentSituation !== 'AGENDADO'
      );
    }
    if (!this.filterSwitches.finished) {
      events = events.filter(
        (event: any) =>
          event.extendedProps.appointment.appointmentSituation !== 'ATENDIDO'
      );
    }
    if (!this.filterSwitches.cancelled) {
      events = events.filter(
        (event: any) =>
          event.extendedProps.appointment.appointmentSituation !== 'CANCELADO'
      );
    }
    if (this.filterMedic) {
      events = events.filter(
        (event: any) =>
          event.extendedProps.appointment.medic.id === this.filterMedic.id
      );
    }
    this.calendarOptions.events = events;
  }

  private addAppointment(arg: any): void {
    console.log(arg);
    const startDateStr: string = arg.startStr.slice(0, 16);
    const endTimeStr: string = arg.endStr.slice(11, 16);
    const urlDateStr: string = `${startDateStr}-${endTimeStr}`;
    this.router.navigate(['novo'], {
      relativeTo: this.route,
      queryParams: { data: urlDateStr }
    });
  }

  private eventDropUpdate(info: any): void {
    this.appointmentService
      .findById(info.oldEvent.id)
      .subscribe((appointment: Appointment) => {
        this.updateEvent(appointment, info);
      });
  }

  private updateEvent(appointment: Appointment, info: any): void {
    appointment.scheduledDate = info.event.startStr.slice(0, 10);
    appointment.startTime = info.event.startStr.slice(11, 16);
    appointment.endTime = info.event.endStr.slice(11, 16);
    this.appointmentService.update(appointment).subscribe({
      error: () => {
        this.modalService.alertDanger(
          'Erro ao atualizar agendamento!',
          'Tente novamente mais tarde.'
        );
      },
      complete: () => {
        this.modalService.alertSuccess(
          'Agendamento atualizado com sucesso!',
          'Atualizando a página...'
        );
        setTimeout(() => {
          this.loadPage = false;
          this.filterMedic = undefined;
          this.onRefresh();
        }, 2000);
      }
    });
  }

  private viewAppointment(arg: any): void {
    this.appointmentService.findById(arg.event.id).subscribe({
      next: (appointment: Appointment) => {
        this.appointment = appointment;
      },
      complete: () => this.appointmentModal.show()
    });
  }

  private maxSelectionAllowed(arg: any): boolean {
    let duration = Math.abs(
      (arg.end.getTime() - arg.start.getTime()) / 3600000
    );
    return duration < 1;
  }

  reloadPage(): void {
    window.location.reload();
  }

  onBack(): void {
    this.location.back();
  }
}
