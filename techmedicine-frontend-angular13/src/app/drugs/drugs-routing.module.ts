import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { DrugDetailsComponent } from './drug-details/drug-details.component';
import { DrugFormComponent } from './drug-form/drug-form.component';
import { DrugListComponent } from './drug-list/drug-list.component';
import { DrugsResolver } from './guards/drugs.resolver';

const routes: Routes = [
  {
    path: '',
    component: DrugListComponent
  },
  {
    path: 'novo',
    component: DrugFormComponent,
    resolve: { drug: DrugsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: DrugFormComponent,
    resolve: { drug: DrugsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: DrugDetailsComponent,
    resolve: { drug: DrugsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugsRoutingModule {}
