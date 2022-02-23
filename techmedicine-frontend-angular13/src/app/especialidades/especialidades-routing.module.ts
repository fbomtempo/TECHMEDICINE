import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { EspecialidadesResolverGuard } from './guards/especialidades-resolver.guard';
import { EspecialidadesFormComponent } from './especialidades-form/especialidades-form.component';
import { EspecialidadesListaComponent } from './especialidades-lista/especialidades-lista.component';
import { EspecialidadesDetalhesComponent } from './especialidades-detalhes/especialidades-detalhes.component';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadesListaComponent
  },
  {
    path: 'novo',
    component: EspecialidadesFormComponent,
    resolve: { especialidade: EspecialidadesResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: EspecialidadesFormComponent,
    resolve: { especialidade: EspecialidadesResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: EspecialidadesDetalhesComponent,
    resolve: { especialidade: EspecialidadesResolverGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialidadesRoutingModule { }
