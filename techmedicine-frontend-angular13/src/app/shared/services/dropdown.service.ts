import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Permission } from 'src/app/dashboard/admin/models/permission';
import { Appointment } from 'src/app/dashboard/appointments/models/appointment';
import { CheckUpHeader } from 'src/app/dashboard/check-ups/models/check-up-header';
import { Disease } from 'src/app/dashboard/diseases/models/disease';
import { Medic } from 'src/app/dashboard/medics/models/medic';
import { Patient } from 'src/app/dashboard/patients/models/patient';
import { Role } from 'src/app/dashboard/roles/models/role';
import { Specialty } from 'src/app/dashboard/specialties/models/specialty';
import { environment } from 'src/environments/environment';

import { State } from '../models/states';
import { MaskService } from './mask.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private readonly API: string = environment.API;

  constructor(private http: HttpClient, private maskService: MaskService) {}

  getStates(): Observable<State[]> {
    return this.http.get<State[]>('assets/data/states.json').pipe(take(1));
  }

  getSpecialties(): Observable<Specialty[]> {
    return this.http
      .get<Specialty[]>(`${this.API}especialidades/ordenar/descricao/crescente`)
      .pipe(take(1));
  }

  getRoles(): Observable<Role[]> {
    return this.http
      .get<Role[]>(`${this.API}cargos/ordenar/descricao/crescente`)
      .pipe(take(1));
  }

  getDiseases(): Observable<Disease[]> {
    return this.http
      .get<Disease[]>(`${this.API}doencas/ordenar/descricao/crescente`)
      .pipe(take(1));
  }

  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(`${this.API}pacientes/ordenar/nomeSobrenome/crescente`)
      .pipe(
        take(1),
        map((patients) => {
          return patients.map((patient: Patient) => {
            this.maskService.formatData(patient);
            return patient;
          });
        })
      );
  }

  getMedics(): Observable<Medic[]> {
    return this.http
      .get<Medic[]>(`${this.API}medicos/ordenar/nomeSobrenome/crescente`)
      .pipe(
        take(1),
        map((medics) => {
          return medics.map((medic: Medic) => {
            this.maskService.formatData(medic);
            return medic;
          });
        })
      );
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API}agendamentos`).pipe(
      take(1),
      map((appointments: Appointment[]) => {
        appointments = appointments.map((appointment: Appointment) => {
          this.maskService.formatData(appointment.patient);
          this.maskService.formatData(appointment.medic);
          return appointment;
        });
        return appointments;
      })
    );
  }

  getCheckUpHeaders(): Observable<CheckUpHeader[]> {
    return this.http
      .get<CheckUpHeader[]>(`${this.API}cabecalhos-atendimento`)
      .pipe(
        take(1),
        map((checkUpHeaders: CheckUpHeader[]) => {
          checkUpHeaders = checkUpHeaders.map(
            (checkUpHeader: CheckUpHeader) => {
              this.maskService.formatData(checkUpHeader.patient);
              this.maskService.formatData(checkUpHeader.medic);
              return checkUpHeader;
            }
          );
          return checkUpHeaders;
        })
      );
  }

  getPermissions(): Observable<Permission[]> {
    return this.http
      .get<Role[]>(`${this.API}permissoes/ordenar/descricao/crescente`)
      .pipe(take(1));
  }
}
