import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  readonly formatOptions = {
    date(value: string): string {
      const date: Date = new Date(value);
      return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    },
    cpf(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    },
    homePhone(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
    },
    mobilePhone(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
    },
    cep(value: string): string {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    }
  }

  constructor() { }

  formatData(obj: any, fields: string[]): any {
    fields.forEach(field => {
      if (obj[field] != null) {
        obj[field] = this.applyMask(field, obj[field]);
      }
    });
    return obj;
  }

  unformatData(obj: any, fields: string[]): any {
    fields.forEach(field => {
      if (obj[field] != null) {
        obj[field] = this.undoMask(field, obj[field]);
      }
    });
    return obj;
  }

  applyMask(mask: string, value: string): string {
    if (value != null) {
      if (mask !== 'cpf' && mask !== 'homePhone' && mask !== 'mobilePhone' && mask !== 'cep' ) {
        return this.formatOptions['date'](value);
      }
      return this.formatOptions[mask](value);
    }
    return value;
  }

  undoMask(mask: string, value: string): string {
    if (value != null) {
      if (mask !== 'cpf' && mask !== 'homePhone' && mask !== 'mobilePhone' && mask !== 'cep' ) {
        const splitDate = value.split('/');
        return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
      }
      return value.replace(/\D/g, '');
    }
    return value;
  }

}
