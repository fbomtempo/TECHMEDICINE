import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud-service';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';

import { CheckUp } from '../model/check-up';

@Injectable({
  providedIn: 'root'
})
export class CheckUpService extends CrudService<CheckUp> {
  constructor(
    protected override http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {
    super(http, `${environment.API}atendimentos`);
  }

  findAllFormatted(): Observable<CheckUp[]> {
    return this.http.get<CheckUp[]>(this.API_URL).pipe(
      delay(750),
      map((checkUps: CheckUp[]) => {
        return checkUps.map((checkUp: CheckUp) => {
          this.dateService.toPtBrDateString(checkUp.checkUpHeader);
          this.maskService.formatData(checkUp.checkUpHeader.patient);
          this.maskService.formatData(checkUp.checkUpHeader.medic);
          return checkUp;
        });
      })
    );
  }

  findAllByPatient(id: number): Observable<CheckUp[]> {
    return this.http.get<CheckUp[]>(`${this.API_URL}/paciente/${id}`).pipe(
      delay(750),
      map((checkUps: CheckUp[]) => {
        return checkUps.map((checkUp: CheckUp) => {
          this.dateService.toPtBrDateString(checkUp.checkUpHeader);
          this.maskService.formatData(checkUp.checkUpHeader.patient);
          this.maskService.formatData(checkUp.checkUpHeader.medic);
          return checkUp;
        });
      })
    );
  }
}
