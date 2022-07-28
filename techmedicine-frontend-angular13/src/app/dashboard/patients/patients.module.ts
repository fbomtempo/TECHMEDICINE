import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientsFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientsRoutingModule } from './patients-routing.module';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientsFormComponent,
    PatientDetailsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    BsDatepickerModule
  ],
  providers: [DatePipe]
})
export class PatientsModule {}
