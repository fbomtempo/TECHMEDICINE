import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud-service';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { environment } from 'src/environments/environment';
import { CheckUpHeader } from '../model/check-up-header';

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
      delay(750),
      map((attendanceHeaders: CheckUpHeader[]) => {
        return attendanceHeaders.map((attendanceHeader: CheckUpHeader) => {
          this.dateService.toPtBrDateString(attendanceHeader);
          this.maskService.formatData(attendanceHeader.patient);
          this.maskService.formatData(attendanceHeader.medic);
          return attendanceHeader;
        });
      })
    );
  }
}
