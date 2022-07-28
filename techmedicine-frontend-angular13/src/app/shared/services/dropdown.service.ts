import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, take } from 'rxjs';
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
import { DateService } from './date.service';
import { MaskService } from './mask.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private readonly API: string = environment.API;

  constructor(
    private http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {}

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

  getDiseases(): Observable<Disease[]> {
    return this.http.get<Disease[]>(`${this.API}doencas`).pipe(
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
      map((patients) => {
        patients = patients.map((patient: Patient) => {
          this.maskService.formatData(patient);
          return patient;
        });
        return patients.sort((a, b) =>
          a.name + ' ' + a.surname > b.name + ' ' + b.surname
            ? 1
            : b.name + ' ' + b.surname > a.name + ' ' + a.surname
            ? -1
            : 0
        );
      })
    );
  }

  getMedics(): Observable<Medic[]> {
    return this.http.get<Medic[]>(`${this.API}medicos`).pipe(
      delay(750),
      take(1),
      map((medics) => {
        medics = medics.map((medic: Medic) => {
          this.maskService.formatData(medic);
          return medic;
        });
        return medics.sort((a, b) =>
          a.name + ' ' + a.surname > b.name + ' ' + b.surname
            ? 1
            : b.name + ' ' + b.surname > a.name + ' ' + a.surname
            ? -1
            : 0
        );
      })
    );
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.API}agendamentos`).pipe(
      delay(750),
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
        delay(750),
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
    return this.http.get<Role[]>(`${this.API}permissoes`).pipe(
      delay(750),
      take(1),
      map((permissions) =>
        permissions.sort((a, b) =>
          a.description > b.description
            ? 1
            : b.description > a.description
            ? -1
            : 0
        )
      )
    );
  }
}
