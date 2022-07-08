import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {
  readonly defaultFields = ['cpf', 'homePhone', 'mobilePhone', 'cep'];
  readonly formatOptions = {
    cpf(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    },
    homePhone(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    },
    mobilePhone(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    },
    cep(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
    }
  };

  constructor() {}

  formatData(obj: any, fields?: string[]): any {
    if (fields) {
      fields.forEach((field: string) => {
        if (obj[field] != null) {
          obj[field] = this.applyMask(field, obj[field]);
        }
      });
    } else {
      this.defaultFields.forEach((field: string) => {
        if (obj[field] != null) {
          obj[field] = this.applyMask(field, obj[field]);
        }
      });
    }
    return obj;
  }

  applyMask(mask: string, value: string): string {
    if (value != null) {
      return this.formatOptions[mask](value);
    }
    return value;
  }

  unformatData(obj: any, fields?: string[]): any {
    if (fields) {
      fields.forEach((field: string) => {
        if (obj[field] != null) {
          obj[field] = this.undoMask(obj[field]);
        }
      });
    } else {
      this.defaultFields.forEach((field: string) => {
        if (obj[field] != null) {
          obj[field] = this.undoMask(obj[field]);
        }
      });
    }
    return obj;
  }

  undoMask(value: string): string {
    if (value != null) {
      return value.replace(/\D/g, '');
    }
    return value;
  }
}
