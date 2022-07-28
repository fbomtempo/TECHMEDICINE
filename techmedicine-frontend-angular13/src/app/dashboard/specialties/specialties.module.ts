import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { SharedModule } from '../../shared/shared.module';
import { SpecialtiesRoutingModule } from './specialties-routing.module';
import { SpecialtyDetailsComponent } from './specialty-details/specialty-details.component';
import { SpecialtyFormComponent } from './specialty-form/specialty-form.component';
import { SpecialtyListComponent } from './specialty-list/specialty-list.component';

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
export class SpecialtiesModule {}
