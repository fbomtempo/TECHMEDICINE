import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { Estado } from 'src/app/shared/models/estado';
import { MaskService } from 'src/app/shared/services/mask.service';
import { Paciente } from '../paciente';

@Component({
  selector: 'app-pacientes-detalhes',
  templateUrl: './pacientes-detalhes.component.html',
  styleUrls: ['./pacientes-detalhes.component.css']
})
export class PacientesDetalhesComponent implements OnInit {

  paciente: Paciente;

  constructor(
    private maskService: MaskService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.paciente = this.route.snapshot.data['paciente'];
    this.formatData();
  }

  private formatData(): void {
    const date: Date = new Date(this.paciente.nascimento);
    this.paciente.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.paciente.cpf = this.maskService.applyMask('cpf', this.paciente.cpf);
    this.paciente.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', this.paciente.cpf);
    this.paciente.telefoneCelular = this.maskService.applyMask('telefoneCelular', this.paciente.telefoneCelular);
    this.paciente.cep =this.maskService.applyMask('cep', this.paciente.cep);
  }

  onBackToList(): void {
    this.location.back();
  }

}
