import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaskService } from 'src/app/shared/services/mask.service';
import { Medico } from '../medico';

@Component({
  selector: 'app-medicos-detalhes',
  templateUrl: './medicos-detalhes.component.html',
  styleUrls: ['./medicos-detalhes.component.css']
})
export class MedicosDetalhesComponent implements OnInit {

  medico: Medico;

  constructor(
    private maskService: MaskService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.medico = this.route.snapshot.data['medico'];
    this.formatData();
  }

  private formatData(): void {
    let date: Date = new Date(this.medico.nascimento);
    this.medico.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.medico.cpf = this.maskService.applyMask('cpf', this.medico.cpf);
    this.medico.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', this.medico.cpf);
    this.medico.telefoneCelular = this.maskService.applyMask('telefoneCelular', this.medico.telefoneCelular);
    this.medico.cep =this.maskService.applyMask('cep', this.medico.cep);
  }

  onBackToList(): void {
    this.location.back();
  }
}
