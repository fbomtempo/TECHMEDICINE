import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppointmentsCalendarComponent,
    AppointmentFormComponent,
    AppointmentModalComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    TypeaheadModule.forRoot(),
  ],
})
export class AppointmentsModule {}
