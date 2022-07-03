import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() {}

  createDateObject(dateStr: string): Date {
    if (dateStr) {
      const date: Date = new Date(dateStr);
      const compensarFusoHorario = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + compensarFusoHorario);
    }
    return null;
  }

  toPtBrDateString(obj: any, dateFields: string[]): any {
    if (dateFields) {
      dateFields.forEach((dateField: string) => {
        if (obj[dateField] != null) {
          obj[dateField] = this.createDateObject(
            obj[dateField]
          ).toLocaleDateString('pt-BR');
        }
      });
    }
    return obj;
  }

  toISODateString(obj: any, dateFields: string[]): any {
    if (dateFields) {
      dateFields.forEach((dateField: string) => {
        if (obj[dateField] != null) {
          obj[dateField] = obj[dateField].toISOString().slice(0, 10);
        }
      });
    }
    return obj;
  }
}
