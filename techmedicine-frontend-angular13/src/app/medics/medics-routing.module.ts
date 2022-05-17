import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { MedicsResolverGuard } from './guards/medics-resolver.guard';
import { MedicDetailsComponent } from './medic-details/medic-details.component';
import { MedicFormComponent } from './medic-form/medic-form.component';
import { MedicListComponent } from './medic-list/medic-list.component';

const routes: Routes = [
  {
    path: '', component: MedicListComponent
  },
  {
    path: 'novo',
    component: MedicFormComponent,
    resolve: { medic: MedicsResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: MedicFormComponent,
    resolve: { medic: MedicsResolverGuard },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: MedicDetailsComponent,
    resolve: { medic: MedicsResolverGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicsRoutingModule { }
