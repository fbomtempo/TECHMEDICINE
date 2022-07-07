import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { AppointmentDetailsComponent } from './appointment-details/appointment-details.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentViewComponent } from './appointment-view/appointment-view.component';
import { AppointmentsResolver } from './guards/appointments.resolver';

const routes: Routes = [
  {
    path: '',
    component: AppointmentViewComponent
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
  },
  {
    path: 'visualizar/:id',
    component: AppointmentDetailsComponent,
    resolve: { appointment: AppointmentsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule {}
