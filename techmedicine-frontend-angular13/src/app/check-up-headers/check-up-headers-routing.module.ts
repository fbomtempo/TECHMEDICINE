import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../shared/guards/deactivate.guard';

import { CheckUpHeaderFormComponent } from './check-up-header-form/check-up-header-form.component';
import { CheckUpHeaderHeaderListComponent } from './check-up-header-list/check-up-header-list.component';
import { CheckUpHeadersResolver } from './guards/check-up-headers.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckUpHeadersRoutingModule {}
