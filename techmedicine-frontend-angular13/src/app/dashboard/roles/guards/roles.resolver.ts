import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Role } from '../models/role';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class RolesResolver implements Resolve<Role> {
  constructor(private roleService: RoleService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Role> | Observable<any> {
    if (route.params && route.params['id']) {
      const role: Observable<Role> | Observable<any> = this.roleService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return role;
    }
    return of({});
  }
}
