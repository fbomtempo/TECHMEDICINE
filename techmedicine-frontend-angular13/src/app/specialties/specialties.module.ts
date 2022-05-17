import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtiesRoutingModule } from './specialties-routing.module';
import { SpecialtyListComponent } from './specialty-list/specialty-list.component';
import { SpecialtyFormComponent } from './specialty-form/specialty-form.component';
import { SpecialtyDetailsComponent } from './specialty-details/specialty-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SpecialtyListComponent,
    SpecialtyFormComponent,
    SpecialtyDetailsComponent
  ],
  imports: [
    CommonModule,
    SpecialtiesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class SpecialtiesModule { }
