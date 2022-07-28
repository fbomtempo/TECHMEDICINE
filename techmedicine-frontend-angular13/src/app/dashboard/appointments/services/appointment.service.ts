import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../../shared/services/crud-service';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends CrudService<Appointment> {
  constructor(
    protected override http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {
    super(http, `${environment.API}agendamentos`);
  }

  findAllFormatted(): Observable<any[]> {
    return this.http.get<Appointment[]>(this.API_URL).pipe(
      delay(750),
      map((appointments: Appointment[]) => {
        return appointments.map((appointment: Appointment) => {
          this.dateService.toPtBrDateString(appointment);
          this.maskService.formatData(appointment.patient);
          this.maskService.formatData(appointment.medic);
          return appointment;
        });
      })
    );
  }

  findAllAsEvents(): Observable<any[]> {
    return this.http.get<Appointment[]>(this.API_URL).pipe(
      delay(750),
      map((appointments: Appointment[]) => {
        return appointments.map((appointment: Appointment) => {
          return {
            id: appointment.id,
            title: `${appointment.patient.name} ${appointment.patient.surname}`,
            start: `${appointment.scheduledDate} ${appointment.startTime}`,
            end: `${appointment.scheduledDate} ${appointment.endTime}`,
            color:
              appointment.appointmentSituation === 'AGENDADO'
                ? ''
                : appointment.appointmentSituation === 'CANCELADO'
                ? '#D90000'
                : '#00b28e',
            extendedProps: {
              appointment: appointment
            },
            constraint:
              appointment.appointmentSituation === 'CANCELADO' ||
              appointment.appointmentSituation === 'ATENDIDO'
                ? {
                    daysOfWeek: []
                  }
                : null
          };
        });
      })
    );
  }
}
