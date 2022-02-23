import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/services/crud-service';
import { Especialidade } from './especialidade';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService extends CrudService<Especialidade> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}especialidades`);
  }

  findByDescricao(descricao: string): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${this.API_URL}/descricao/${descricao}`)
      .pipe();
  }
}
