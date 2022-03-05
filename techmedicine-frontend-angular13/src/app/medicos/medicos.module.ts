import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MedicosRoutingModule } from './medicos-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MedicosListaComponent } from './medicos-lista/medicos-lista.component';
import { MedicosFormComponent } from './medicos-form/medicos-form.component';

@NgModule({
  declarations: [
    MedicosListaComponent,
    MedicosFormComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    AutocompleteLibModule
  ],
  providers: [
    DatePipe
  ]
})
export class MedicosModule { }
