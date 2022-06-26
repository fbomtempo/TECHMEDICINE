import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { AppointmentsCalendarComponent } from './appointment-calendar/appointment-calendar.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentsResolver } from './guards/appointments.resolver';

const routes: Routes = [
  {
    path: '', component: AppointmentsCalendarComponent
  },
  {
    path: 'novo',
    component: AppointmentFormComponent,
    resolve: { appointment: AppointmentsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: AppointmentFormComponent,
    resolve: { appointment: AppointmentsResolver },
    canDeactivate: [DeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
