import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL: string = environment.API;

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log({ username, password });
    return this.http.post(`${this.API_URL}login`, { usuario: username, senha: password }, this.httpOptions);
  }

  /*register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}cadastrar` + 'signup', { username, email, password }, this.httpOptions);
  }*/

}


