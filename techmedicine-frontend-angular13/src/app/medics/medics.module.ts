import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MedicsRoutingModule } from './medics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MedicListComponent } from './medic-list/medic-list.component';
import { MedicFormComponent } from './medic-form/medic-form.component';
import { MedicDetailsComponent } from './medic-details/medic-details.component';


@NgModule({
  declarations: [
    MedicListComponent,
    MedicFormComponent,
    MedicDetailsComponent
  ],
  imports: [
    CommonModule,
    MedicsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  providers: [
    DatePipe
  ]
})
export class MedicsModule { }
