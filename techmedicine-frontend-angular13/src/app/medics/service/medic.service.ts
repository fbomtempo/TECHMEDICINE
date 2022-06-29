import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../shared/services/crud-service';
import { Medic } from '../model/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends CrudService<Medic> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}medicos`);
  }
}
