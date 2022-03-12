import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { Funcionario } from './funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService extends CrudService<Funcionario>  {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}funcionarios`);
  }
}
