import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

import { TokenStorageService } from './services/token-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

  constructor(
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq: HttpRequest<any> = req;
    const token: string = this.tokenService.getToken();
    const url: string = req.url;
    if (token && !url.endsWith('/oauth/token')) {
      authReq = req.clone({
        headers: req.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
    }
    return next.handle(authReq).pipe(
      catchError((err: any) => {
        return this.requestError(err);
      })
    );
  }

  private requestError(err: any): Observable<never> {
    if (err.status === 401 && err.error.error === 'invalid_token') {
      alert('Token expirado! Faça o login novamente.');
      this.router.navigate(['/login']);
      return of();
    }
    if (err.status === 403) {
      alert('Acesso negado!');
      this.router.navigate(['/home']);
      return of();
    }
    if (!err.status) {
      this.router.navigate(['/500']);
      return of();
    }
    return throwError(() => err);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
