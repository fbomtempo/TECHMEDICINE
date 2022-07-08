import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, take } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../shared/services/crud-service';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends CrudService<Patient> {
  constructor(
    protected override http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {
    super(http, `${environment.API}pacientes`);
  }

  findAllFormatted(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.API_URL).pipe(
      delay(750),
      map((patients: Patient[]) => {
        return patients.map((patient: Patient) => {
          this.maskService.formatData(patient, [
            'cpf',
            'homePhone',
            'mobilePhone',
            'cep'
          ]);
          this.dateService.toPtBrDateString(patient, ['birthDate']);
          return patient;
        });
      })
    );
  }
}
