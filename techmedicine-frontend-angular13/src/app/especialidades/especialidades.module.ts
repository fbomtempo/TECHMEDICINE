import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspecialidadesListaComponent } from './especialidades-lista/especialidades-lista.component';
import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { EspecialidadesFormComponent } from './especialidades-form/especialidades-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EspecialidadesDetalhesComponent } from './especialidades-detalhes/especialidades-detalhes.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EspecialidadesListaComponent,
    EspecialidadesFormComponent,
    EspecialidadesDetalhesComponent
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class EspecialidadesModule { }
