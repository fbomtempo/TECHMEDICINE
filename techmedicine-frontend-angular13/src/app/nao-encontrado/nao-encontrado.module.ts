import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaoEncontradoRoutingModule } from './nao-encontrado-routing.module';
import { NaoEncontradoComponent } from './nao-encontrado.component';

@NgModule({
  declarations: [
    NaoEncontradoComponent
  ],
  imports: [
    CommonModule,
    NaoEncontradoRoutingModule
  ]
})
export class NaoEncontradoModule { }
