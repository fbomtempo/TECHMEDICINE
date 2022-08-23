import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { PatientEletronicRecordsRoutingModule } from './patient-eletronic-records-routing.module';
import { PerPatientListComponent } from './per-patient-list/per-patient-list.component';
import { PerPatientPageComponent } from './per-patient-page/per-patient-page.component';
import { PerPatientDetailsModalComponent } from './per-patient-details-modal/per-patient-details-modal.component';
import { PrescriptionPrintModelComponent } from './per-checkup-print-models/prescription-print-model/prescription-print-model/prescription-print-model.component';

@NgModule({
  declarations: [
    PerPatientListComponent,
    PerPatientPageComponent,
    PerPatientDetailsModalComponent,
    PrescriptionPrintModelComponent
  ],
  imports: [
    CommonModule,
    PatientEletronicRecordsRoutingModule,
    FormsModule,
    SharedModule,
    NgSelectModule,
    CollapseModule,
    PaginationModule,
    AccordionModule,
    BsDatepickerModule
  ]
})
export class PatientEletronicRecordsModule {}
