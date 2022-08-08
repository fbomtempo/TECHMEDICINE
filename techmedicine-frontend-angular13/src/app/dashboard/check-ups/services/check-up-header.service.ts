import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud-service';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';

import { CheckUpHeader } from '../models/check-up-header';

@Injectable({
  providedIn: 'root'
})
export class CheckUpHeaderService extends CrudService<CheckUpHeader> {
  constructor(
    protected override http: HttpClient,
    private maskService: MaskService,
    private dateService: DateService
  ) {
    super(http, `${environment.API}cabecalhos-atendimento`);
  }

  findAllFormatted(): Observable<any[]> {
    return this.http.get<CheckUpHeader[]>(this.API_URL).pipe(
      take(1),
      map((checkUpHeaders: CheckUpHeader[]) => {
        return checkUpHeaders.map((checkUpHeader: CheckUpHeader) => {
          this.dateService.toPtBrDateString(checkUpHeader);
          this.maskService.formatData(checkUpHeader.patient);
          this.maskService.formatData(checkUpHeader.medic);
          return checkUpHeader;
        });
      })
    );
  }
}
