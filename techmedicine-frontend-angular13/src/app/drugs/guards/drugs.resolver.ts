import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Drug } from '../model/drug';
import { DrugService } from '../service/drug.service';

@Injectable({
  providedIn: 'root'
})
export class DrugsResolver implements Resolve<Drug> {
  constructor(private drugService: DrugService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Drug> | Observable<any> {
    if (route.params && route.params['id']) {
      const drug: Observable<Drug> | Observable<any> = this.drugService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return drug;
    }
    return of({});
  }
}
