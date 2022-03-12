import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Medico } from '../medico';
import { MedicosService } from '../medicos.service';

@Injectable({
  providedIn: 'root'
})
export class MedicosResolverGuard implements Resolve<Medico> {

  constructor(
    private medicosService: MedicosService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Medico> |  Observable<any> {
    if (route.params && route.params['id']) {
      let medico = this.medicosService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of();
      }))
      return medico;
    }

    return of({
      id: null,
      descricao: null
    });
  }

}
