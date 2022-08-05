import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './http-errors/not-found-page/not-found.component';
import { ServerErrorComponent } from './http-errors/server-error-page/server-error.component';
import { UnauthorizedComponent } from './http-errors/unauthorized/unauthorized.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canLoad: [AuthGuard]
  },
  {
    path: '403',
    component: UnauthorizedComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '500',
    component: ServerErrorComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
