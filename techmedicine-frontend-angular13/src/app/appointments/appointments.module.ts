import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppointmentsCalendarComponent,
    AppointmentFormComponent,
    AppointmentModalComponent,
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    PaginationModule,
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot(),
    NgSelectModule
  ]
})
export class AppointmentsModule {}
