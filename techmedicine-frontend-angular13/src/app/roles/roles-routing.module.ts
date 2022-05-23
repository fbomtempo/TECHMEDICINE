import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { RolesDetailsComponent } from './role-details/role-details.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RolesResolver } from './guards/roles.resolver';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent
  },
  {
    path: 'novo',
    component: RoleFormComponent,
    resolve: { role: RolesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: RoleFormComponent,
    resolve: { role: RolesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: RolesDetailsComponent,
    resolve: { role: RolesResolver }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
