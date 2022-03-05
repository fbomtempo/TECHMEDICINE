import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { MedicosResolverGuard } from './guards/medicos-resolver.guard';
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
  /*{
    path: 'visualizar/:id',
    component: PacientesDetalhesComponent,
    resolve: { paciente: PacientesResolverGuard }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
