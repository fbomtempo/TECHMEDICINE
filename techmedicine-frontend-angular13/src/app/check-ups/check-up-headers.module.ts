import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { CheckUpHeaderDetailsComponent } from './check-up-header-details/check-up-header-details.component';
import { CheckUpHeaderFormComponent } from './check-up-header-form/check-up-header-form.component';
import { CheckUpHeaderHeaderListComponent } from './check-up-header-list/check-up-header-list.component';
import { CheckUpsRoutingModule } from './check-up-headers-routing.module';
import { CheckUpFormComponent } from './check-up-form/check-up-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    CheckUpHeaderHeaderListComponent,
    CheckUpHeaderFormComponent,
    CheckUpHeaderDetailsComponent,
    CheckUpFormComponent
  ],
  imports: [
    CommonModule,
    CheckUpsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    PaginationModule,
    NgSelectModule,
    CollapseModule,
    TabsModule
  ]
})
export class CheckUpsModule {}
