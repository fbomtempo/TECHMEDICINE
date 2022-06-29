import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { catchError, map, Observable, of, Subject, take } from 'rxjs';
import { AppointmentModalComponent } from 'src/app/appointments/appointment-modal/appointment-modal.component';
import { Medic } from 'src/app/medics/model/medic';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentsCalendarComponent implements OnInit {
  loadPage: boolean;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: ptBrLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    stickyHeaderDates: true,
    allDaySlot: false,
    expandRows: true,
    slotMinTime: '08:00',
    slotMaxTime: '19:00',
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
        endTime: '19:00'
      }
    ],
    editable: true,
    eventConstraint: 'businessHours',
    eventDrop: this.eventDropUpdate.bind(this),
    eventClick: this.viewAppointment.bind(this),
    eventOverlap: false,
    selectable: true,
    selectConstraint: 'businessHours',
    select: this.addAppointment.bind(this),
    selectAllow: this.maxSelectionAllowed.bind(this)
  };
  appointments$: Observable<Appointment[]>;
  appointment: Appointment;
  error: Subject<boolean> = new Subject();
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  @ViewChild('appointmentModal', { static: true })
  appointmentModal?: AppointmentModalComponent;

  constructor(
    private appointmentService: AppointmentService,
    private dropdownService: DropdownService,
    private maskService: MaskService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.onRefresh();
  }

  private fetchData(): void {
    this.dropdownService
      .getMedics()
      .pipe(
        map((medics: Medic[]) => {
          return medics.map((medic: Medic) => {
            return this.maskService.formatData(medic, [
              'birthDate',
              'cpf',
              'homePhone',
              'mobilePhone',
              'cep'
            ]);
          });
        })
      )
      .subscribe({
        next: (medics: Medic[]) => {
          this.medics = medics.map((medic: any) => {
            medic.searchLabel = `${medic.name} ${medic.surname}`;
            return medic;
          });
        },
        complete: () => (this.medicsLoading = false)
      });
  }

  onRefresh(): void | Observable<never> {
    this.loadPage = false;
    let agendamentos: any[];
    this.appointmentService
      .findAll()
      .pipe(
        take(1),
        catchError(() => {
          this.error.next(true);
          return of();
        })
      )
      .subscribe({
        next: (appointments: Appointment[]) => {
          agendamentos = appointments.map((appointment: Appointment) => {
            return {
              id: appointment.id,
              title: `${appointment.patient.name} ${appointment.patient.surname}`,
              start: appointment.scheduledTimestamp,
              end: appointment.endTimestamp
            };
          });
        },
        complete: () => {
          this.calendarOptions.events = agendamentos;
          this.loadPage = true;
        }
      });
  }

  private addAppointment(arg: any): void {
    const startDateStr: string = arg.startStr.slice(0, 16);
    const endTimeStr: string = arg.endStr.slice(11, 16);
    const urlDateStr: string = `${startDateStr}-${endTimeStr}`;
    this.router.navigate(['novo'], {
      relativeTo: this.route,
      queryParams: { data: urlDateStr }
    });
  }

  private eventDropUpdate(info: any): void {
    let appointment: Appointment;
    this.appointmentService.findById(info.oldEvent.id).subscribe((result) => {
      appointment = result;
      this.updateEvent(appointment, info);
    });
  }

  private updateEvent(appointment: Appointment, info: any): void {
    appointment.scheduledTimestamp = info.event.startStr.slice(0, 16);
    appointment.endTimestamp = info.event.endStr.slice(0, 16);
    this.appointmentService.update(appointment).subscribe({
      error: () =>
        this.modalService.alertDanger(
          'Erro ao atualizar agendamento!',
          'Tente novamente mais tarde.'
        ),
      complete: () => {
        this.modalService.alertSuccess(
          'Agendamento atualizado com sucesso!',
          'Atualizando a página...'
        );
        setTimeout(() => this.onRefresh(), 2000);
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

  onBack(): void {
    this.location.back();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
