import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { PatientsResolverGuard } from './guards/patients-resolver.guard';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientsFormComponent } from './patient-form/patient-form.component';
import { PatientsListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: '', component: PatientsListComponent
  },
  {
    path: 'novo',
    component: PatientsFormComponent,
    resolve: { patient: PatientsResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: PatientsFormComponent,
    resolve: { patient: PatientsResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: PatientDetailsComponent,
    resolve: { patient: PatientsResolverGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
