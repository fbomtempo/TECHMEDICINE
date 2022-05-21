import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { catchError, Observable, of, Subject, switchMap, take } from 'rxjs';
import { AppointmentModalComponent } from 'src/app/appointments/appointment-modal/appointment-modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentsCalendarComponent implements OnInit {

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
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '08:00',
        endTime: '12:00'
      },
      {
        daysOfWeek: [ 1, 2, 3, 4, 5 ],
        startTime: '14:00',
        endTime: '19:00'
      },
    ],
    editable: true,
    eventDrop: this.eventDropUpdate.bind(this),
    eventConstraint: "businessHours",
    eventOverlap: false,
    selectable: true,
    select: this.addAppointment.bind(this),
    selectConstraint: "businessHours",
    selectAllow: this.maxSelectionAllowed.bind(this),
    eventClick: this.viewAppointment.bind(this)
  };
  appointments$: Observable<Appointment[]>;
  appointment: Appointment;
  error: Subject<boolean> = new Subject();
  @ViewChild('appointmentModal', { static: true }) appointmentModal?: AppointmentModalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void | Observable<never> {
    let agendamentos: any[];
    this.appointments$ = this.appointmentService.findAll()
      .pipe(
        catchError(() => {
          this.error.next(true);
          return of();
        })
      );
    this.appointments$.subscribe(result => {
      agendamentos = result.map((a: Appointment) => {
        return {
          id: a.id,
          title: a.patient.name + ' ' + a.patient.surname,
          start: a.scheduledTimestamp,
          end: a.endTimestamp
        };
      });
      this.calendarOptions.events = agendamentos;
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  private addAppointment(arg): void {
    const startDateStr: string = arg.startStr.slice(0, 16);
    const endTimeStr: string = arg.endStr.slice(11, 16);
    const urlDateStr: string = startDateStr + '-'  + endTimeStr;
    this.router.navigate(['novo'], {
      relativeTo: this.route,
      queryParams: { data: urlDateStr }
    });
  }

  private viewAppointment(arg): void {
      this.appointmentService.findById(arg.event.id).subscribe(result => {
      this.appointment = result;
      this.appointmentModal.show();
    });
  }

  private maxSelectionAllowed(arg): boolean {
    var duration = Math.abs((arg.end.getTime() - arg.start.getTime()) / 3600000);
    return duration < 1;
  }

  private eventDropUpdate(info): void {
    let appointment: Appointment;
    this.appointmentService.findById(info.oldEvent.id).subscribe(result => {
      appointment = result;
      this.updateEvent(appointment, info);
    });
  }

  private updateEvent(appointment: Appointment, info): void {
    appointment.scheduledTimestamp = info.event.startStr.slice(0, 16);
    appointment.endTimestamp = info.event.endStr.slice(0, 16);
    this.appointmentService.update(appointment)
      .subscribe({
        error: () => this.modalService.alertDanger('Erro ao atualizar agendamento!', 'Tente novamente mais tarde.'),
        complete: () => {
          this.modalService.alertSuccess('Agendamento atualizado com sucesso!', 'Atualizando a página...');
          setTimeout(() => this.onRefresh(), 2000);
        }
      });
  }

}

