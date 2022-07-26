import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL: string = environment.API;
  private readonly clientId: string = 'techmedicine';
  private readonly clientSecret: string = 'techmedicineSecretKey';
  private readonly httpOptions: any = {
    headers: new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    return this.http.post<any>(
      `${this.API_URL}oauth/token`,
      params.toString(),
      this.httpOptions
    );
  }

  /*register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}cadastrar` + 'signup', { username, email, password }, this.httpOptions);
  }*/
}
