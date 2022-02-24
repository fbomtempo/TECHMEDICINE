import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>('assets/dados/estados.json')
      .pipe();
  }

  /*getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'},
    ]
  }

  getTecnologias() {
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ]
  }

  getNewsletter() {
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }*/
}
