import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { Medico } from './medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService extends CrudService<Medico>  {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}medicos`);
  }
}
