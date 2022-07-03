import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import scrollGridPlugin from '@fullcalendar/scrollgrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedModule } from '../shared/shared.module';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';
import { AppointmentCalendarComponent } from './appointment-view/appointment-calendar/appointment-calendar.component';
import { AppointmentListComponent } from './appointment-view/appointment-list/appointment-list.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  scrollGridPlugin
]);

@NgModule({
  declarations: [
    AppointmentViewComponent,
    AppointmentCalendarComponent,
    AppointmentListComponent,
    AppointmentFormComponent,
    AppointmentModalComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    BsDatepickerModule,
    PaginationModule,
    NgSelectModule,
    TabsModule
  ]
})
export class AppointmentsModule {}
