import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'medicos',
        loadChildren: () =>
          import('./medics/medics.module').then((m) => m.MedicsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'funcionarios',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'especialidades',
        loadChildren: () =>
          import('./specialties/specialties.module').then(
            (m) => m.SpecialtiesModule
          ),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'cargos',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'doencas',
        loadChildren: () =>
          import('./diseases/diseases.module').then((m) => m.DiseasesModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'atendimentos',
        loadChildren: () =>
          import('./check-ups/check-up-headers.module').then(
            (m) => m.CheckUpsModule
          ),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'pep',
        loadChildren: () =>
          import(
            './patient-eletronic-records/patient-eletronic-records.module'
          ).then((m) => m.PatientEletronicRecordsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
