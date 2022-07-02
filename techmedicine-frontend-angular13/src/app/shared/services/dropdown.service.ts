import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, take } from 'rxjs';
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
    return this.http.get<Specialty[]>(`${this.API}especialidades`).pipe(
      delay(750),
      take(1),
      map((specialties) =>
        specialties.sort((a, b) =>
          a.description > b.description
            ? 1
            : b.description > a.description
            ? -1
            : 0
        )
      )
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.API}cargos`).pipe(
      delay(750),
      take(1),
      map((roles) =>
        roles.sort((a, b) =>
          a.description > b.description
            ? 1
            : b.description > a.description
            ? -1
            : 0
        )
      )
    );
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.API}pacientes`).pipe(
      delay(750),
      take(1),
      map((patients) =>
        patients.sort((a, b) =>
          a.name + ' ' + a.surname > b.name + ' ' + b.surname
            ? 1
            : b.name + ' ' + b.surname > a.name + ' ' + a.surname
            ? -1
            : 0
        )
      )
    );
  }

  getMedics(): Observable<Medic[]> {
    return this.http.get<Medic[]>(`${this.API}medicos`).pipe(
      delay(750),
      take(1),
      map((medics) =>
        medics.sort((a, b) =>
          a.name + ' ' + a.surname > b.name + ' ' + b.surname
            ? 1
            : b.name + ' ' + b.surname > a.name + ' ' + a.surname
            ? -1
            : 0
        )
      )
    );
  }
}
