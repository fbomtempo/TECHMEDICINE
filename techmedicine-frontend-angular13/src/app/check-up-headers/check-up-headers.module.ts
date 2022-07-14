import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { CheckUpHeaderFormComponent } from './check-up-header-form/check-up-header-form.component';
import { CheckUpHeaderHeaderListComponent } from './check-up-header-list/check-up-header-list.component';
import { CheckUpHeadersRoutingModule } from './check-up-headers-routing.module';
import { CheckUpHeaderDetailsComponent } from './check-up-header-details/check-up-header-details.component';

@NgModule({
  declarations: [CheckUpHeaderHeaderListComponent, CheckUpHeaderFormComponent, CheckUpHeaderDetailsComponent],
  imports: [
    CommonModule,
    CheckUpHeadersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    PaginationModule,
    NgSelectModule
  ]
})
export class CheckUpHeadersModule {}
