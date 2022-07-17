import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';

import { Exam } from '../model/exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CrudService<Exam> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}exames`);
  }
}
