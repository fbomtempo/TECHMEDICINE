import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Exam } from '../model/exam';
import { ExamService } from '../service/exam.service';

@Injectable({
  providedIn: 'root'
})
export class ExamsResolver implements Resolve<Exam> {
  constructor(private examService: ExamService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Exam> | Observable<any> {
    if (route.params && route.params['id']) {
      const exam: Observable<Exam> | Observable<any> = this.examService
        .findById(route.params['id'])
        .pipe(
          catchError(() => {
            this.router.navigate(['nao-encontrado']);
            return of({});
          })
        );
      return exam;
    }
    return of({});
  }
}
