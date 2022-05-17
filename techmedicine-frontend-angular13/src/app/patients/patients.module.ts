import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PatientsListComponent } from './patient-list/patient-list.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';
import { PatientsFormComponent } from './patient-form/patient-form.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

@NgModule({
  declarations: [
    PatientsListComponent,
    PatientsFormComponent,
    PatientDetailsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  providers: [
    DatePipe
  ]
})
export class PatientsModule { }
