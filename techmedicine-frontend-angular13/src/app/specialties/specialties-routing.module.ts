import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { SpecialtiesResolver } from './guards/specialties.resolver';
import { SpecialtyDetailsComponent } from './specialty-details/specialty-details.component';
import { SpecialtyFormComponent } from './specialty-form/specialty-form.component';
import { SpecialtyListComponent } from './specialty-list/specialty-list.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialtyListComponent
  },
  {
    path: 'novo',
    component: SpecialtyFormComponent,
    resolve: { specialty: SpecialtiesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: SpecialtyFormComponent,
    resolve: { specialty: SpecialtiesResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: SpecialtyDetailsComponent,
    resolve: { specialty: SpecialtiesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialtiesRoutingModule {}
