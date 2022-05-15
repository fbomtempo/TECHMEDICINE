import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaskService } from 'src/app/shared/services/mask.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-funcionarios-detalhes',
  templateUrl: './funcionarios-detalhes.component.html',
  styleUrls: ['./funcionarios-detalhes.component.css']
})
export class FuncionariosDetalhesComponent implements OnInit {

  funcionario: Funcionario;

  constructor(
    private maskService: MaskService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.funcionario = this.route.snapshot.data['funcionario'];
    this.formatData();
  }

  private formatData(): void {
    let date: Date = new Date(this.funcionario.nascimento);
    this.funcionario.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.funcionario.cpf = this.maskService.applyMask('cpf', this.funcionario.cpf);
    this.funcionario.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', this.funcionario.cpf);
    this.funcionario.telefoneCelular = this.maskService.applyMask('telefoneCelular', this.funcionario.telefoneCelular);
    this.funcionario.cep =this.maskService.applyMask('cep', this.funcionario.cep);
  }

  onBackToList(): void {
    this.location.back();
  }

}
