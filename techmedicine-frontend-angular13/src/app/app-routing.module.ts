import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
  },
  {
    path: 'medicos',
    loadChildren: () => import('./medics/medics.module').then(m => m.MedicsModule)
  },
  {
    path: 'funcionarios',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'especialidades',
    loadChildren: () => import('./specialties/specialties.module').then(m => m.SpecialtiesModule)
  },
  {
    path: 'cargos',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: 'agendamentos',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
