import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canLoadModule(route);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivateChildRoute(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivateChildRoute(childRoute);
  }

  private canLoadModule(route: Route): boolean {
    if (route.path !== 'login') {
      if (this.isUserLoggedIn()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    } else {
      if (this.isUserLoggedIn()) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }
  }

  private isUserLoggedIn(): boolean {
    return this.tokenService.getToken() && !this.tokenService.isExpired();
  }

  private canActivateChildRoute(childRoute: ActivatedRouteSnapshot): boolean {
    const { authorities } = this.tokenService.getUser();
    const roles: string[] = childRoute.data['roles'];
    if (this.isUserLoggedIn()) {
      if (roles) {
        let activate: boolean = false;
        roles.forEach((role: string) => {
          if (authorities.includes(role)) {
            activate = true;
          }
        });
        if (!activate) {
          this.router.navigate(['/403']);
        }
        return activate;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
