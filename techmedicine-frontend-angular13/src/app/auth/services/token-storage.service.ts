import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly TOKEN_KEY = 'auth-token';
  private readonly USER_KEY = 'auth-user';
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor() {}

  saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
    this.saveUser(token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  saveUser(token: string): void {
    const tokenString: string = token;
    if (tokenString) {
      const { user_name, authorities } =
        this.jwtHelper.decodeToken(tokenString);
      const user: any = {
        user_name,
        authorities
      };
      window.sessionStorage.removeItem(this.USER_KEY);
      window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  isExpired(): boolean {
    const token: string = this.getToken();
    if (token) {
      return this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  /*getUsernameAndAuthorities(): any | null {
    const tokenString: string = this.getToken();
    if (tokenString) {
      const { user_name, authorities } =
        this.jwtHelper.decodeToken(tokenString);
      return {
        user_name,
        authorities
      };
    }
    return null;
  }*/

  /*saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }*/
}
