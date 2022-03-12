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
    this.formatData(this.paciente);
    /*this.estados$ = this.http.get<Estado>('assets/dados/estados.json').pipe(take(1));
    this.subscription = this.estados$.subscribe(estados => {
      this.estados = estados;
      this.estados.forEach(estado => {
        if (this.paciente.estado === estado.uf) {
          this.paciente.estado = estado.descricao;
        }
      })
    });*/
  }

  private formatData(paciente: Paciente): void {
    let date: Date = new Date(paciente.nascimento);
    paciente.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    paciente.cpf = this.maskService.applyMask('cpf', paciente.cpf);
    paciente.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', paciente.cpf);
    paciente.telefoneCelular = this.maskService.applyMask('telefoneCelular', paciente.telefoneCelular);
    paciente.cep =this.maskService.applyMask('cep', paciente.cep);
  }

  onBackToList(): void {
    this.location.back();
  }

}
