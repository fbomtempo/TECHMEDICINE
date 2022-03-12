import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { FuncionariosDetalhesComponent } from './funcionarios-detalhes/funcionarios-detalhes.component';
import { FuncionariosFormComponent } from './funcionarios-form/funcionarios-form.component';
import { FuncionariosListaComponent } from './funcionarios-lista/funcionarios-lista.component';
import { FuncionariosResolverGuard } from './guards/funcionarios-resolver.guard';

const routes: Routes = [
  {
    path: '', component: FuncionariosListaComponent
  },
  {
    path: 'novo',
    component: FuncionariosFormComponent,
    resolve: { funcionario: FuncionariosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: FuncionariosFormComponent,
    resolve: { funcionario: FuncionariosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: FuncionariosDetalhesComponent,
    resolve: { funcionario: FuncionariosResolverGuard }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
