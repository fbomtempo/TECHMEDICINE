import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';

import { CrudService } from '../../shared/services/crud-service';
import { Medic } from '../model/medic';

@Injectable({
  providedIn: 'root'
})
export class MedicService extends CrudService<Medic> {
  constructor(
    protected override http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {
    super(http, `${environment.API}medicos`);
  }

  findAllFormatted(): Observable<Medic[]> {
    return this.http.get<Medic[]>(this.API_URL).pipe(
      delay(750),
      map((medics: Medic[]) => {
        return medics.map((medic: Medic) => {
          this.maskService.formatData(medic);
          this.dateService.toPtBrDateString(medic);
          return medic;
        });
      })
    );
  }
}
