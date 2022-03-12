import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRoutingModule } from './cargos-routing.module';
import { CargosListaComponent } from './cargos-lista/cargos-lista.component';
import { CargosDetalhesComponent } from './cargos-detalhes/cargos-detalhes.component';
import { CargosFormComponent } from './cargos-form/cargos-form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    CargosListaComponent,
    CargosDetalhesComponent,
    CargosFormComponent
  ],
  imports: [
    CommonModule,
    CargosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ]
})
export class CargosModule { }
