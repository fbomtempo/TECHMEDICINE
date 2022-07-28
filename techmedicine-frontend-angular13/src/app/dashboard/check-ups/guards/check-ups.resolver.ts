import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { CheckUp } from '../models/check-up';
import { CheckUpService } from '../services/check-up.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUpsResolver implements Resolve<CheckUp> {
  constructor(private checkUpService: CheckUpService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CheckUp> | Observable<any> {
    if (route.params && route.params['id']) {
      const checkUp: Observable<CheckUp> | Observable<any> = this.checkUpService
        .findById(route.params['id'])
        .pipe(
          catchError((err) => {
            console.log(err);
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return checkUp;
    }
    return of({});
  }
}
