import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsResolver implements Resolve<Patient> {
  constructor(private patientService: PatientService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Patient> | Observable<any> {
    if (route.params && route.params['id']) {
      const patient: Observable<Patient> | Observable<any> = this.patientService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return patient;
    }
    return of({});
  }
}
