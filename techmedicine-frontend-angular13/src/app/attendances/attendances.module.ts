import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendancesRoutingModule } from './attendances-routing.module';

@NgModule({
  declarations: [AttendanceListComponent],
  imports: [
    CommonModule,
    AttendancesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    PaginationModule,
    NgSelectModule
  ]
})
export class AttendancesModule {}
