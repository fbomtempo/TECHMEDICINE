import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeactivateGuard } from '../shared/guards/deactivate.guard';
import { CheckUpFormComponent } from './check-up-form/check-up-form.component';
import { CheckUpHeaderDetailsComponent } from './check-up-header-details/check-up-header-details.component';
import { CheckUpHeaderFormComponent } from './check-up-header-form/check-up-header-form.component';
import { CheckUpHeaderHeaderListComponent } from './check-up-header-list/check-up-header-list.component';
import { CheckUpHeadersResolver } from './guards/check-up-headers.resolver';

const routes: Routes = [
  {
    path: 'iniciar',
    component: CheckUpHeaderHeaderListComponent
  },
  {
    path: 'iniciar/novo',
    component: CheckUpHeaderFormComponent,
    resolve: { checkUpHeader: CheckUpHeadersResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'iniciar/editar/:id',
    component: CheckUpHeaderFormComponent,
    resolve: { checkUpHeader: CheckUpHeadersResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'iniciar/visualizar/:id',
    component: CheckUpHeaderDetailsComponent,
    resolve: { checkUpHeader: CheckUpHeadersResolver }
  },
  {
    path: 'realizar/novo',
    component: CheckUpFormComponent
  },
  {
    path: '',
    redirectTo: '/iniciar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckUpsRoutingModule {}
