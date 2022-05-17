import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../shared/services/crud-service';
import { Appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends CrudService<Appointment>  {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}agendamentos`);
  }
}
