import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, take } from 'rxjs';
import { Medic } from 'src/app/medics/model/medic';
import { Patient } from 'src/app/patients/model/patient';
import { Role } from 'src/app/roles/model/role';
import { Specialty } from 'src/app/specialties/model/specialty';
import { environment } from 'src/environments/environment';

import { State } from '../models/states';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private readonly API: string = environment.API;

  constructor(private http: HttpClient) {}

  getStates(): Observable<State[]> {
    return this.http.get<State[]>('assets/data/states.json').pipe(take(1));
  }

  getSpecialties(): Observable<Specialty[]> {
    return this.http
      .get<Specialty[]>(`${this.API}especialidades/orderBy/descricao`)
      .pipe(delay(750), take(1));
  }

  getRoles(): Observable<Role[]> {
    return this.http
      .get<Role[]>(`${this.API}cargos/orderBy/descricao`)
      .pipe(delay(750), take(1));
  }

  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(`${this.API}pacientes`)
      .pipe(delay(750), take(1));
  }

  getMedics(): Observable<Medic[]> {
    return this.http
      .get<Medic[]>(`${this.API}medicos`)
      .pipe(delay(750), take(1));
  }
}
