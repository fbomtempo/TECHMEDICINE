import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../shared/shared.module';
import { DiseaseDetailsComponent } from './disease-details/disease-details.component';
import { DiseaseFormComponent } from './disease-form/disease-form.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseasesRoutingModule } from './diseases-routing.module';

@NgModule({
  declarations: [
    DiseaseListComponent,
    DiseaseFormComponent,
    DiseaseDetailsComponent
  ],
  imports: [
    CommonModule,
    DiseasesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class DiseasesModule {}
