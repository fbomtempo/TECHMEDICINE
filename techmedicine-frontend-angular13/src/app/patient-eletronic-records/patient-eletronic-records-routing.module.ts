import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsResolver } from '../patients/guards/patients.resolver';
import { PerPatientListComponent } from './per-patient-list/per-patient-list.component';
import { PerPatientPageComponent } from './per-patient-page/per-patient-page.component';

const routes: Routes = [
  {
    path: '',
    component: PerPatientListComponent
  },
  {
    path: 'paciente/:id',
    component: PerPatientPageComponent,
    resolve: { patient: PatientsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientEletronicRecordsRoutingModule {}
