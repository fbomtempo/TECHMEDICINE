import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsResolver implements Resolve<Appointment> {

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Appointment> | Observable<any> {
    if (route.params && route.params['id']) {
      const appointment = this.appointmentService.findById(route.params['id'])
        .pipe(catchError(() => {
          this.router.navigate(['nao-encontrado']);
          return of({});
        }));
      return appointment;
    }
    return of({});
  }

}
