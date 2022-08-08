import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../../shared/services/crud-service';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends CrudService<Employee> {
  constructor(
    protected override http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {
    super(http, `${environment.API}funcionarios`);
  }

  findAllFormatted(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL).pipe(
      take(1),
      map((employees: Employee[]) => {
        return employees.map((employee: Employee) => {
          this.maskService.formatData(employee);
          this.dateService.toPtBrDateString(employee);
          return employee;
        });
      })
    );
  }
}
