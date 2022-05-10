import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-agendamentos-lista',
  templateUrl: './agendamentos-lista.component.html',
  styleUrls: ['./agendamentos-lista.component.css']
})
export class AgendamentosListaComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: ptBrLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    },
    height: 740,
    dateClick: this.handleDateClick.bind(this),
    allDaySlot: false,
    slotMinTime: '08:00',
    slotMaxTime: '21:00',
    /*titleFormat: { year: 'numeric', month: 'long' },*/
    events: [
      { title: 'event 1', date: '2022-04-29 10:30' },
      { title: 'event 2', date: '2022-04-29 11:00' },
      { title: 'event 3', date: '2022-04-29 11:30' },
      { title: 'event 4', date: '2022-04-29 12:00' },
    ]
  };

  constructor(
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  handleDateClick(arg) {
    const dateStr: string = arg.dateStr.slice(0, 16);
    this.router.navigate(['agendamentos/novo', dateStr]);
    //this.modalService.alertSuccess('Teste', 'Teste');
  }

}

/*  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    /*dateClick: this.handleDateClick.bind(this), // bind is important!
    height: 725,
    locale: ptBrLocale,
    headerToolbar: {
      start: 'title', // will normally be on the left. if RTL, will be on the right
      center: '',
      end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
    },
    titleFormat: { year: 'numeric', month: 'long' },
    events: [
      { title: 'event 1', date: '2022-03-10' },
      { title: 'event 2', date: '2022-03-11' }
    ]
  };
*/
