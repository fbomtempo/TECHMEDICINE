import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Especialidade } from 'src/app/especialidades/especialidade';
import { MedicosService } from '../medicos.service';

@Injectable({
  providedIn: 'root'
})
export class MedicosResolverGuard implements Resolve<Especialidade> {

  constructor(
    private medicosService: MedicosService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Especialidade> |  Observable<any> {
    if (route.params && route.params['id']) {
      let paciente = this.medicosService.findById(route.params['id'])
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
