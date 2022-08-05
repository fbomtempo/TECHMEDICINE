import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly API_URL = environment.API;

  constructor(private http: HttpClient) {}

  getTotalPatients() {
    return this.http.get<number>(`${this.API_URL}relatorios/totalPacientes`);
  }

  getTotalAppointments() {
    return this.http.get<number>(`${this.API_URL}relatorios/totalAgendamentos`);
  }

  getTotalCheckUps() {
    return this.http.get<number>(`${this.API_URL}relatorios/totalAtendimentos`);
  }
}
