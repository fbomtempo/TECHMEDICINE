import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';

import { Drug } from '../model/drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService extends CrudService<Drug> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}medicamentos`);
  }
}
