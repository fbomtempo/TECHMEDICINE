import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../../shared/services/crud-service';
import { Disease } from '../models/disease';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService extends CrudService<Disease> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}doencas`);
  }
}
