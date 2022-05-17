import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {

  private readonly masks = {
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

  applyMask(mask: string, value: string): string {
    return this.masks[mask](value);
  }

  undoMask(value: string): string {
    return value.replace(/\D/g, '');
  }

}
