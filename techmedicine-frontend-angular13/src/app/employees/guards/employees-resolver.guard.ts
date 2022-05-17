
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesResolverGuard implements Resolve<Employee> {

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee> |  Observable<any> {
    if (route.params && route.params['id']) {
      let employee = this.employeeService.findById(route.params['id'])
      .pipe(catchError(() => {
        this.router.navigate(['nao-encontrado']);
        return of({});
      }))
      return employee;
    }

    return of({});
  }

}
