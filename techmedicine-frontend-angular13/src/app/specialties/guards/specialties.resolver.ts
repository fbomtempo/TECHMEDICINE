import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Specialty } from '../model/specialty';
import { SpecialtyService } from '../service/specialty.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesResolver implements Resolve<Specialty> {
  constructor(
    private specialtyService: SpecialtyService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Specialty> | Observable<any> {
    if (route.params && route.params['id']) {
      const specialty: Observable<Specialty> | Observable<any> =
        this.specialtyService.findById(route.params['id']).pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return specialty;
    }
    return of({});
  }
}
