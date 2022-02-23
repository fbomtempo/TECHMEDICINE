import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule)
  },
  {
    path: 'especialidades',
    loadChildren: () => import('./especialidades/especialidades.module').then(m => m.EspecialidadesModule)
  },
  {
    path: '',
    redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () => import('./nao-encontrado/nao-encontrado.module').then(m => m.NaoEncontradoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
