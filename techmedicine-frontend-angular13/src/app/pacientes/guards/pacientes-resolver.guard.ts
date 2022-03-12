import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Paciente } from '../paciente';
import { PacientesService } from '../pacientes.service';

@Injectable({
  providedIn: 'root'
})
export class PacientesResolverGuard implements Resolve<Paciente> {

  constructor(
    private pacientesService: PacientesService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paciente> |  Observable<any> {
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
