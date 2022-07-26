import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateGuard } from './shared/guards/activate.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./patients/patients.module').then((m) => m.PatientsModule),
    canActivate: [ActivateGuard]
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./medics/medics.module').then((m) => m.MedicsModule),
    canActivate: [ActivateGuard]
  },
  {
    path: 'funcionarios',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
    canActivate: [ActivateGuard]
  },
  {
    path: 'especialidades',
    loadChildren: () =>
      import('./specialties/specialties.module').then(
        (m) => m.SpecialtiesModule
      ),
    canActivate: [ActivateGuard]
  },
  {
    path: 'cargos',
    loadChildren: () =>
      import('./roles/roles.module').then((m) => m.RolesModule),
    canActivate: [ActivateGuard]
  },
  {
    path: 'doencas',
    loadChildren: () =>
      import('./diseases/diseases.module').then((m) => m.DiseasesModule),
    canActivate: [ActivateGuard]
  },
  {
    path: 'agendamentos',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (m) => m.AppointmentsModule
      ),
    canActivate: [ActivateGuard]
  },
  {
    path: 'atendimentos',
    loadChildren: () =>
      import('./check-ups/check-up-headers.module').then(
        (m) => m.CheckUpsModule
      )
  },
  {
    path: 'pep',
    loadChildren: () =>
      import(
        './patient-eletronic-records/patient-eletronic-records.module'
      ).then((m) => m.PatientEletronicRecordsModule),
    canActivate: [ActivateGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
    canActivate: [ActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
