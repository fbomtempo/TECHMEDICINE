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
        canActivateChild: [AuthGuard],
        data: {
          roles: [
            'ROLE_ADMIN',
            'ROLE_MEDICO',
            'ROLE_ASSISTENTE_ADM',
            'ROLE_RECEPCIONISTA'
          ]
        }
      },
      {
        path: 'pacientes',
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_RECEPCIONISTA'] }
      },
      {
        path: 'medicos',
        loadChildren: () =>
          import('./medics/medics.module').then((m) => m.MedicsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ASSISTENTE_ADM'] }
      },
      {
        path: 'funcionarios',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ASSISTENTE_ADM'] }
      },
      {
        path: 'especialidades',
        loadChildren: () =>
          import('./specialties/specialties.module').then(
            (m) => m.SpecialtiesModule
          ),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ASSISTENTE_ADM'] }
      },
      {
        path: 'cargos',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ASSISTENTE_ADM'] }
      },
      {
        path: 'doencas',
        loadChildren: () =>
          import('./diseases/diseases.module').then((m) => m.DiseasesModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_ASSISTENTE_ADM'] }
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_RECEPCIONISTA'] }
      },
      {
        path: 'atendimentos',
        loadChildren: () =>
          import('./check-ups/check-up-headers.module').then(
            (m) => m.CheckUpsModule
          ),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_RECEPCIONISTA'] }
      },
      {
        path: 'pep',
        loadChildren: () =>
          import(
            './patient-eletronic-records/patient-eletronic-records.module'
          ).then((m) => m.PatientEletronicRecordsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN', 'ROLE_MEDICO'] }
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: { roles: ['ROLE_ADMIN'] }
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
        data: {
          roles: ['ROLE_ADMIN', 'ROLE_MEDICO', 'ROLE_ASSISTENTE_ADM']
        }
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
