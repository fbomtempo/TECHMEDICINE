import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import { AgendamentosListaComponent } from './agendamentos-lista/agendamentos-lista.component';

const routes: Routes = [
  {
    path: '', component: AgendamentosListaComponent
  },
  {
    path: 'novo/:data',
    component: AgendamentosFormComponent,
    /*canDeactivate: [DeactivateGuard],
    resolve: { medico: MedicosResolverGuard },*/
  }/*,
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
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
