import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../shared/services/crud-service';
import { Specialty } from '../model/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends CrudService<Specialty> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}especialidades`);
  }
}
