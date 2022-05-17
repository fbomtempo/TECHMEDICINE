import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../shared/services/crud-service';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<Employee>  {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}funcionarios`);
  }
}
