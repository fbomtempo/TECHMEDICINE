import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../shared/services/crud-service';
import { Specialty } from '../model/specialty';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends CrudService<Specialty> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}especialidades`);
  }

  findByDescricao(descricao: string): Observable<Specialty[]> {
    return this.http.get<Specialty[]>(`${this.API_URL}/descricao/${descricao}`)
      .pipe();
  }
}
