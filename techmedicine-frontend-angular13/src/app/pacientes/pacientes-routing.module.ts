import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { PacientesResolverGuard } from './guards/pacientes-resolver.guard';
import { PacientesDetalhesComponent } from './pacientes-detalhes/pacientes-detalhes.component';
import { PacientesFormComponent } from './pacientes-form/pacientes-form.component';
import { PacientesListaComponent } from './pacientes-lista/pacientes-lista.component';

const routes: Routes = [
  {
    path: '', component: PacientesListaComponent
  },
  {
    path: 'novo',
    component: PacientesFormComponent,
    resolve: { paciente: PacientesResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: PacientesFormComponent,
    resolve: { paciente: PacientesResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: PacientesDetalhesComponent,
    resolve: { paciente: PacientesResolverGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
