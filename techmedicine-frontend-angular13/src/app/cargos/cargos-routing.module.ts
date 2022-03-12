import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { CargosDetalhesComponent } from './cargos-detalhes/cargos-detalhes.component';
import { CargosFormComponent } from './cargos-form/cargos-form.component';
import { CargosListaComponent } from './cargos-lista/cargos-lista.component';
import { CargosResolverGuard } from './guards/cargos-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: CargosListaComponent
  },
  {
    path: 'novo',
    component: CargosFormComponent,
    resolve: { cargo: CargosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: CargosFormComponent,
    resolve: { cargo: CargosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: CargosDetalhesComponent,
    resolve: { cargo: CargosResolverGuard }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
