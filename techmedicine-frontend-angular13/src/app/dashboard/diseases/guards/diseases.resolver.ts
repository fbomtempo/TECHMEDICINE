import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Disease } from '../models/disease';
import { DiseaseService } from '../services/disease.service';

@Injectable({
  providedIn: 'root'
})
export class DiseasesResolver implements Resolve<Disease> {
  constructor(private diseaseService: DiseaseService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Disease> | Observable<any> {
    if (route.params && route.params['id']) {
      const disease: Observable<Disease> | Observable<any> = this.diseaseService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return disease;
    }
    return of({});
  }
}
