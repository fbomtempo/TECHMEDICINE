import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Cargo } from 'src/app/cargos/cargo';
import { Especialidade } from 'src/app/especialidades/especialidade';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private readonly API: string = environment.API;

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>('assets/dados/estados.json')
      .pipe(take(1));
  }

  getEspecialidades() {
    return this.http.get<Especialidade[]>(`${this.API}especialidades/orderBy/descricao`)
      .pipe(take(1));
  }

  getCargos() {
    return this.http.get<Cargo[]>(`${this.API}cargos/orderBy/descricao`)
      .pipe(take(1));
  }

}
