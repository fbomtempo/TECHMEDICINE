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
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenService.getToken() && !this.tokenService.isExpired()) {
      return true;
    }
    //this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (this.tokenService.getToken() && !this.tokenService.isExpired()) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (route.path !== 'login') {
    //   if (this.tokenService.getToken() && !this.tokenService.isExpired()) {
    //     return true;
    //   }
    //   this.router.navigate(['/login']);
    //   return false;
    // } else {
    //   if (this.tokenService.getToken() && !this.tokenService.isExpired()) {
    //     this.router.navigate(['/home']);
    //     return false;
    //   }
    //   return true;
    // }
    return true;
  }
}
