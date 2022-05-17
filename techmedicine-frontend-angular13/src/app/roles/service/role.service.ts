import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../shared/services/crud-service';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cargos`);
  }

}
