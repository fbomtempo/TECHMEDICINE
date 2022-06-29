import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesResolver } from './guards/employees.resolver';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'novo',
    component: EmployeeFormComponent,
    resolve: { employee: EmployeesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: EmployeeFormComponent,
    resolve: { employee: EmployeesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: EmployeeDetailsComponent,
    resolve: { employee: EmployeesResolver }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
