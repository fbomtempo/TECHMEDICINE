import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosListaComponent } from './funcionarios-lista/funcionarios-lista.component';
import { FuncionariosFormComponent } from './funcionarios-form/funcionarios-form.component';
import { FuncionariosDetalhesComponent } from './funcionarios-detalhes/funcionarios-detalhes.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    FuncionariosListaComponent,
    FuncionariosFormComponent,
    FuncionariosDetalhesComponent
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule
  ],
  providers: [
    DatePipe
  ]
})
export class FuncionariosModule { }
