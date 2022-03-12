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
    this.formatData(this.funcionario);
  }

  private formatData(funcionario: Funcionario): void {
    let date: Date = new Date(funcionario.nascimento);
    funcionario.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    funcionario.cpf = this.maskService.applyMask('cpf', funcionario.cpf);
    funcionario.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', funcionario.cpf);
    funcionario.telefoneCelular = this.maskService.applyMask('telefoneCelular', funcionario.telefoneCelular);
    funcionario.cep =this.maskService.applyMask('cep', funcionario.cep);
  }

  onBackToList(): void {
    this.location.back();
  }

}
