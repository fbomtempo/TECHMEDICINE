import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { DrugFormComponent } from './drug-form/drug-form.component';
import { DrugListComponent } from './drug-list/drug-list.component';
import { DrugsRoutingModule } from './drugs-routing.module';

@NgModule({
  declarations: [DrugListComponent, DrugDetailsComponent, DrugFormComponent],
  imports: [
    CommonModule,
    DrugsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class DrugsModule {}
