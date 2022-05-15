import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { catchError, Observable, of, Subject } from 'rxjs';
import { AppointmentModalComponent } from 'src/app/shared/appointment-modal/appointment-modal/appointment-modal.component';
import { Agendamento } from '../agendamento';
import { AgendamentosService } from '../agendamentos.service';

@Component({
  selector: 'app-agendamentos-calendario',
  templateUrl: './agendamentos-calendario.component.html',
  styleUrls: ['./agendamentos-calendario.component.css']
})
export class AgendamentosCalendarioComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: ptBrLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    //height: 740,
    //aspectRatio: 1.40,
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
    selectable: true,
    select: this.addAppointment.bind(this),
    selectConstraint: "businessHours",
    selectAllow: this.maxSelectionAllowed.bind(this),
    eventClick: this.viewAppointment.bind(this)
  };
  agendamentos$: Observable<Agendamento[]>;
  error: Subject<boolean> = new Subject();
  @ViewChild('appointmentModal', { static: true }) appointmentModal?: AppointmentModalComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agendamentosService: AgendamentosService
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(): void | Observable<never> {
    let agendamentos: any[];
    this.agendamentos$ = this.agendamentosService.findAll()
      .pipe(
        catchError(() => {
          this.error.next(true);
          return of();
        })
      );
    this.agendamentos$.subscribe((result: Agendamento[]) => {
      agendamentos = result.map((a: Agendamento) => {
        return {
          id: a.id,
          title: a.paciente.nome + ' ' + a.paciente.sobrenome,
          start: a.dataAgendada,
          end: a.dataTermino
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
    let agendamento: Agendamento;
    this.agendamentosService.findById(arg.event.id).subscribe(result => {
      agendamento = result;
      console.log(arg.event);
      this.appointmentModal.id = agendamento.id;
      this.appointmentModal.dataAgendada = arg.event.startStr;
      this.appointmentModal.showModal();
    });
  }

  private maxSelectionAllowed(arg): boolean {
    var duration = Math.abs((arg.end.getTime() - arg.start.getTime()) / 3600000);
    return duration < 1;
  }
}
