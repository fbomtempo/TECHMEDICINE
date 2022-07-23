import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Icd } from '../model/icd';
import { IcdService } from '../service/icd.service';

@Injectable({
  providedIn: 'root'
})
export class IcdsResolver implements Resolve<Icd> {
  constructor(private icdService: IcdService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Icd> | Observable<any> {
    if (route.params && route.params['id']) {
      const icd: Observable<Icd> | Observable<any> = this.icdService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return icd;
    }
    return of({});
  }
}
