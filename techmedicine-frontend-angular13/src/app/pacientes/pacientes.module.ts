import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';
import { PacientesFormComponent } from './pacientes-form/pacientes-form.component';
import { PacientesDetalhesComponent } from './pacientes-detalhes/pacientes-detalhes.component';

@NgModule({
  declarations: [
    PacientesListaComponent,
    PacientesFormComponent,
    PacientesDetalhesComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  providers: [
    DatePipe
  ]
})
export class PacientesModule { }
