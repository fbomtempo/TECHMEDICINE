import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../../shared/guards/deactivate.guard';
import { MedicsResolver } from './guards/medics.resolver';
import { MedicDetailsComponent } from './medic-details/medic-details.component';
import { MedicFormComponent } from './medic-form/medic-form.component';
import { MedicListComponent } from './medic-list/medic-list.component';

const routes: Routes = [
  {
    path: '',
    component: MedicListComponent
  },
  {
    path: 'novo',
    component: MedicFormComponent,
    resolve: { medic: MedicsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: MedicFormComponent,
    resolve: { medic: MedicsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: MedicDetailsComponent,
    resolve: { medic: MedicsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicsRoutingModule {}
