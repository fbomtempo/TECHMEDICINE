import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CheckUpHeader } from '../model/check-up-header';
import { CheckUpHeaderService } from '../service/check-up-header.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUpHeadersResolver implements Resolve<CheckUpHeader> {
  constructor(
    private checkUpHeaderService: CheckUpHeaderService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CheckUpHeader> | Observable<any> {
    if (route.params && route.params['id']) {
      const checkUpHeader: Observable<CheckUpHeader> | Observable<any> =
        this.checkUpHeaderService.findById(route.params['id']).pipe(
          catchError((err) => {
            console.log(err);
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return checkUpHeader;
    }
    return of({});
  }
}
