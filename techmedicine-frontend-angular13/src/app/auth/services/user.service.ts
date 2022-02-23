import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = environment.API;

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${this.API_URL}test/all`, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${this.API_URL}test/funcionario`, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(`${this.API_URL}test/medico`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.API_URL}test/admin`, { responseType: 'text' });
  }
}
