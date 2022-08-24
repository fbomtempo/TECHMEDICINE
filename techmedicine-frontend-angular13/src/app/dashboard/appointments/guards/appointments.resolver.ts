import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsResolver implements Resolve<Appointment> {
  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Appointment> | Observable<any> {
    if (route.params && route.params['id']) {
      const appointment: Observable<Appointment> | Observable<any> =
        this.appointmentService.findById(route.params['id']).pipe(
          catchError(() => {
            this.router.navigate(['404']);
            return of({});
          })
        );
      return appointment;
    }
    return of({});
  }
}
