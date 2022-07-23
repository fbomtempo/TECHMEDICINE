import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../shared/services/crud-service';
import { Icd } from '../model/icd';

@Injectable({
  providedIn: 'root'
})
export class IcdService extends CrudService<Icd> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}icds`);
  }
}
