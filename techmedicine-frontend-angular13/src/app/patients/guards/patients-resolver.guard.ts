import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsResolverGuard implements Resolve<Patient> {

  constructor(
    private patientService: PatientService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Patient> |  Observable<any> {
    if (route.params && route.params['id']) {
      let patient = this.patientService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of({});
      }))
      return patient;
    }

    return of({});
  }

}
