import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Especialidade } from 'src/app/especialidades/especialidade';
import { PacientesService } from '../pacientes.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesResolverGuard implements Resolve<Especialidade> {

  constructor(
    private pacientesService: PacientesService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Especialidade> |  Observable<any> {
    if (route.params && route.params['id']) {
      let paciente = this.pacientesService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of();
      }))
      return paciente;
    }

    return of({
      id: null,
      descricao: null
    });
  }

}
