import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Cargo } from '../cargo';
import { EspecialidadesService } from 'src/app/especialidades/especialidades.service';
import { CargosService } from '../cargos.service';

@Injectable({
  providedIn: 'root'
})
export class CargosResolverGuard implements Resolve<Cargo> {

  constructor(
    private cargosService: CargosService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cargo> |  Observable<any> {
    if (route.params && route.params['id']) {
      let cargo = this.cargosService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of();
      }))
      return cargo;
    }

    return of({
      id: null,
      descricao: null
    });
  }

}
