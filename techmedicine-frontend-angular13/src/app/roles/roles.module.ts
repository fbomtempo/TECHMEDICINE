import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RolesDetailsComponent } from './role-details/role-details.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    RoleListComponent,
    RolesDetailsComponent,
    RoleFormComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class RolesModule { }
