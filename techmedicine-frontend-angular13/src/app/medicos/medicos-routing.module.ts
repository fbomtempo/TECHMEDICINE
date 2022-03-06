import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { MedicosResolverGuard } from './guards/medicos-resolver.guard';
import { MedicosDetalhesComponent } from './medicos-detalhes/medicoss-detalhes.component';
import { MedicosFormComponent } from './medicos-form/medicos-form.component';
import { MedicosListaComponent } from './medicos-lista/medicos-lista.component';

const routes: Routes = [
  {
    path: '', component: MedicosListaComponent
  },
  {
    path: 'novo',
    component: MedicosFormComponent,
    resolve: { medico: MedicosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: MedicosFormComponent,
    resolve: { medico: MedicosResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: MedicosDetalhesComponent,
    resolve: { medico: MedicosResolverGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
