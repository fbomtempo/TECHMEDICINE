import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { Agendamento } from './agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService extends CrudService<Agendamento>  {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}agendamentos`);
  }
}
