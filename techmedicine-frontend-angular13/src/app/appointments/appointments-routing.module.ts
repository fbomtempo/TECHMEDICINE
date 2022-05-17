import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { AppointmentsCalendarComponent } from './appointment-calendar/appointment-calendar.component';

const routes: Routes = [
  {
    path: '', component: AppointmentsCalendarComponent
  },
  {
    path: 'novo',
    component: AppointmentFormComponent,
    /*canDeactivate: [DeactivateGuard],
    resolve: { medico: MedicosResolverGuard },*/
  }/*,
  {
    path: 'editar/:id',
    component: MedicosFormComponent,
    resolve: { medico: MedicosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: MedicosDetalhesComponent,
    resolve: { medico: MedicosResolverGuard }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
