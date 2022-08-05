import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { DeactivateGuard } from '../../shared/guards/deactivate.guard';
import { CheckUpFormComponent } from './check-up-form/check-up-form.component';
import { CheckUpHeaderDetailsComponent } from './check-up-header-details/check-up-header-details.component';
import { CheckUpHeaderFormComponent } from './check-up-header-form/check-up-header-form.component';
import { CheckUpHeaderHeaderListComponent } from './check-up-header-list/check-up-header-list.component';
import { CheckUpHeadersResolver } from './guards/check-up-headers.resolver';
import { CheckUpsResolver } from './guards/check-ups.resolver';

const routes: Routes = [
  {
    path: '',
    component: CheckUpHeaderHeaderListComponent
  },
  {
    path: 'novo',
    component: CheckUpHeaderFormComponent,
    resolve: { checkUpHeader: CheckUpHeadersResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'editar/:id',
    component: CheckUpHeaderFormComponent,
    resolve: { checkUpHeader: CheckUpHeadersResolver },
    canDeactivate: [DeactivateGuard]
  },
  {
    path: 'visualizar/:id',
    component: CheckUpHeaderDetailsComponent,
    resolve: { checkUpHeader: CheckUpHeadersResolver }
  },
  {
    path: 'realizar/novo',
    component: CheckUpFormComponent,
    resolve: { checkUp: CheckUpsResolver },
    canDeactivate: [DeactivateGuard],
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_MEDICO'] }
  },
  {
    path: 'realizar/editar/:id',
    component: CheckUpFormComponent,
    resolve: { checkUp: CheckUpsResolver },
    canDeactivate: [DeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckUpsRoutingModule {}
