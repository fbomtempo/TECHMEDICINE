import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { MedicDetailsComponent } from './medic-details/medic-details.component';
import { MedicFormComponent } from './medic-form/medic-form.component';
import { MedicListComponent } from './medic-list/medic-list.component';
import { MedicsRoutingModule } from './medics-routing.module';

@NgModule({
  declarations: [MedicListComponent, MedicFormComponent, MedicDetailsComponent],
  imports: [
    CommonModule,
    MedicsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PaginationModule,
    BsDatepickerModule
  ],
  providers: [DatePipe]
})
export class MedicsModule {}
