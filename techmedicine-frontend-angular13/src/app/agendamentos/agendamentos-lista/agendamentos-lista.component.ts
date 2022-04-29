import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

@Component({
  selector: 'app-agendamentos-lista',
  templateUrl: './agendamentos-lista.component.html',
  styleUrls: ['./agendamentos-lista.component.css']
})
export class AgendamentosListaComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
    //this.router.navigate(['agendamentos/novo', arg.dateStr]);
  }

}
