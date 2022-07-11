import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  readonly defaultDateFields = ['birthDate', 'scheduledDate', 'date'];
  readonly defaultTimestampFields = ['scheduledTimestamp', 'endTimestamp'];

  constructor() {}

  createDateObject(dateStr: string, isTimestamp: boolean): Date {
    if (isTimestamp === true) {
      return new Date(dateStr);
    } else {
      const date: Date = new Date(dateStr);
      const compensarFusoHorario = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + compensarFusoHorario);
    }
  }

  toPtBrDateString(obj: any, dateFields?: string[]): any {
    if (dateFields) {
      dateFields.forEach((dateField: string) => {
        if (obj[dateField] != null) {
          obj[dateField] = this.createDateObject(
            obj[dateField],
            false
          ).toLocaleDateString('pt-BR');
        }
      });
    } else {
      this.defaultDateFields.forEach((dateField: string) => {
        if (obj[dateField] != null) {
          obj[dateField] = this.createDateObject(
            obj[dateField],
            false
          ).toLocaleDateString('pt-BR');
        }
      });
    }
    return obj;
  }

  toPtBrTimestampString(obj: any, timestampFields?: string[]): any {
    if (timestampFields) {
      timestampFields.forEach((timestampField: string) => {
        if (obj[timestampField] != null) {
          obj[timestampField] = this.createDateObject(
            obj[timestampField],
            true
          ).toLocaleString('pt-BR');
          obj[timestampField] = obj[timestampField].slice(0, 16);
        }
      });
    } else {
      this.defaultTimestampFields.forEach((timestampField: string) => {
        if (obj[timestampField] != null) {
          obj[timestampField] = this.createDateObject(
            obj[timestampField],
            true
          ).toLocaleString('pt-BR');
          obj[timestampField] = obj[timestampField].slice(0, 16);
        }
      });
    }
    return obj;
  }

  toISODateString(obj: any, dateFields?: string[]): any {
    if (dateFields) {
      dateFields.forEach((dateField: string) => {
        if (obj[dateField] != null) {
          obj[dateField] = obj[dateField].toISOString().slice(0, 10);
        }
      });
    } else {
      this.defaultDateFields.forEach((dateField: string) => {
        if (obj[dateField] != null) {
          obj[dateField] = obj[dateField].toISOString().slice(0, 10);
        }
      });
    }
    return obj;
  }
}
