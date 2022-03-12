import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { Cargo } from './cargo';

@Injectable({
  providedIn: 'root'
})
export class CargosService extends CrudService<Cargo> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cargos`);
  }

}
