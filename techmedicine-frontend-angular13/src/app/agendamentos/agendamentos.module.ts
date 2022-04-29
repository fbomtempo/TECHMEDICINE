import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendamentosListaComponent } from './agendamentos-lista/agendamentos-lista.component';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AgendamentosListaComponent,
    AgendamentosFormComponent
  ],
  imports: [
    CommonModule,
    AgendamentosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    TypeaheadModule.forRoot()
  ]
})
export class AgendamentosModule { }
