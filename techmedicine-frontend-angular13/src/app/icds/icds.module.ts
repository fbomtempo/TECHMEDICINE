import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { IcdDetailsComponent } from './icd-details/icd-details.component';
import { IcdFormComponent } from './icd-form/icd-form.component';
import { IcdListComponent } from './icd-list/icd-list.component';
import { IcdsRoutingModule } from './icds-routing.module';

@NgModule({
  declarations: [IcdListComponent, IcdFormComponent, IcdDetailsComponent],
  imports: [
    CommonModule,
    IcdsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class IcdsModule {}
