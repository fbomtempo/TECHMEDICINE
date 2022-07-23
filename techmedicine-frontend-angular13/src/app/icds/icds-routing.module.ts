import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { IcdsResolver } from './guards/icds.resolver';
import { IcdDetailsComponent } from './icd-details/icd-details.component';
import { IcdFormComponent } from './icd-form/icd-form.component';
import { IcdListComponent } from './icd-list/icd-list.component';

const routes: Routes = [
  {
    path: '',
    component: IcdListComponent
  },
  {
    path: 'novo',
    component: IcdFormComponent,
    resolve: { icd: IcdsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: IcdFormComponent,
    resolve: { icd: IcdsResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: IcdDetailsComponent,
    resolve: { icd: IcdsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcdsRoutingModule {}
