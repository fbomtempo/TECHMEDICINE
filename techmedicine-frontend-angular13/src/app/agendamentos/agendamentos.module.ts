import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosListaComponent } from './agendamentos-lista/agendamentos-lista.component';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentModalComponent } from '../shared/appointment-modal/appointment-modal/appointment-modal.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AgendamentosListaComponent,
    AgendamentosFormComponent,
    AppointmentModalComponent
  ],
  imports: [
    CommonModule,
    AgendamentosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    TypeaheadModule.forRoot(),
  ]
})
export class AgendamentosModule { }
