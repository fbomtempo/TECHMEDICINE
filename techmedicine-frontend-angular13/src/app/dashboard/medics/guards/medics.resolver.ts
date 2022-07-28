import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Medic } from '../models/medic';
import { MedicService } from '../services/medic.service';

@Injectable({
  providedIn: 'root'
})
export class MedicsResolver implements Resolve<Medic> {
  constructor(private medicService: MedicService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Medic> | Observable<any> {
    if (route.params && route.params['id']) {
      const medic: Observable<Medic> | Observable<any> = this.medicService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return medic;
    }
    return of({});
  }
}
