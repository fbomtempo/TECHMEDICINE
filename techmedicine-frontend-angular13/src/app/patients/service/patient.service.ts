import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../shared/services/crud-service';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends CrudService<Patient> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}pacientes`);
  }
}
