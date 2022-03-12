import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Funcionario } from '../funcionario';
import { FuncionariosService } from '../funcionarios.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosResolverGuard implements Resolve<Funcionario> {

  constructor(
    private funcionariosService: FuncionariosService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Funcionario> |  Observable<any> {
    if (route.params && route.params['id']) {
      let funcionario = this.funcionariosService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of();
      }))
      return funcionario;
    }

    return of({
      id: null,
      descricao: null
    });
  }

}
