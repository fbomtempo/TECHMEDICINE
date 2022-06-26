import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepSearchService {

  constructor(private http: HttpClient) { }

  searchCEP(cep: string): Observable<any> {
    cep = cep.replace(/\D/g, '');
    if (cep != '') {
      let validarCep = /^[0-9]{8}$/;
      if (validarCep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(
            take(1)
          );
      }
    }
    return EMPTY;
  }
}
