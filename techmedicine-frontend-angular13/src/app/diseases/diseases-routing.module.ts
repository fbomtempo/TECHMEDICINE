import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { DiseaseDetailsComponent } from './disease-details/disease-details.component';
import { DiseaseFormComponent } from './disease-form/disease-form.component';
import { DiseaseListComponent } from './disease-list/disease-list.component';
import { DiseasesResolver } from './guards/diseases.resolver';

const routes: Routes = [
  {
    path: '',
    component: DiseaseListComponent
  },
  {
    path: 'novo',
    component: DiseaseFormComponent,
    resolve: { disease: DiseasesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: DiseaseFormComponent,
    resolve: { disease: DiseasesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: DiseaseDetailsComponent,
    resolve: { disease: DiseasesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseasesRoutingModule {}
