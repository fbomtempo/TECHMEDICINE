import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { Paciente } from './paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService extends CrudService<Paciente> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}pacientes`);
  }
}
