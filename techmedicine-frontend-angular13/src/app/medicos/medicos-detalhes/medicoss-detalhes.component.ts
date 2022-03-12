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
    this.formatData(this.medico);
  }

  private formatData(medico: Medico): void {
    let date: Date = new Date(medico.nascimento);
    medico.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    medico.cpf = this.maskService.applyMask('cpf', medico.cpf);
    medico.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', medico.cpf);
    medico.telefoneCelular = this.maskService.applyMask('telefoneCelular', medico.telefoneCelular);
    medico.cep =this.maskService.applyMask('cep', medico.cep);
  }

  onBackToList(): void {
    this.location.back();
  }
}
