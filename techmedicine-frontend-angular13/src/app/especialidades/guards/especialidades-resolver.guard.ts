import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Especialidade } from 'src/app/especialidades/especialidade';
import { EspecialidadesService } from 'src/app/especialidades/especialidades.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesResolverGuard implements Resolve<Especialidade> {

  constructor(
    private especialidadesService: EspecialidadesService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Especialidade> |  Observable<any> {
    if (route.params && route.params['id']) {
      let especialidade = this.especialidadesService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of();
      }))
      return especialidade;
    }

    return of({
      id: null,
      descricao: null
    });
  }

}
