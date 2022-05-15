import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { AgendamentosFormComponent } from './agendamentos-form/agendamentos-form.component';
import { AgendamentosCalendarioComponent } from './agendamentos-calendario/agendamentos-calendario.component';

const routes: Routes = [
  {
    path: '', component: AgendamentosCalendarioComponent
  },
  {
    path: 'novo',
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
