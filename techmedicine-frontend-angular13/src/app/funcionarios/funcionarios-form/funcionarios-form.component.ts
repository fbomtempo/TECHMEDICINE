import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Cargo } from 'src/app/cargos/cargo';
import { Estado } from 'src/app/shared/models/estado';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Funcionario } from '../funcionario';
import { FuncionariosService } from '../funcionarios.service';

@Component({
  selector: 'app-funcionarios-form',
  templateUrl: './funcionarios-form.component.html',
  styleUrls: ['./funcionarios-form.component.css']
})
export class FuncionariosFormComponent extends FormService implements OnInit {

  estados$: Observable<Estado[]>;
  cargos$: Observable<Cargo[]>;
  compareFn(c1: Cargo, c2: Cargo): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private funcionariosService: FuncionariosService,
    private modalService: ModalService,
    private cepService: ConsultaCepService,
    private maskService: MaskService,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    protected override formBuilder: FormBuilder,
    protected override router: Router,
    protected override location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.estados$ = this.dropdownService.getEstados();
    this.cargos$ = this.dropdownService.getCargos();
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    let funcionario = this.route.snapshot.data['funcionario'];

    this.form = this.formBuilder.group({
      id: [funcionario.id],
      nome: [funcionario.nome, [Validators.required, Validators.maxLength(20)]],
      sobrenome: [funcionario.sobrenome, [Validators.required, Validators.maxLength(50)]],
      nascimento: [funcionario.nascimento, [Validators.required]],
      sexo: [funcionario.sexo, [Validators.required, Validators.maxLength(9)]],
      cargo: [funcionario.cargo, [Validators.required]],
      rg: [funcionario.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [funcionario.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      telefoneResidencial: [funcionario.telefoneResidencial, [Validators.minLength(14), Validators.maxLength(14)]],
      telefoneCelular: [funcionario.telefoneCelular, [Validators.minLength(15), Validators.required, Validators.maxLength(15)]],
      email: [funcionario.email, [Validators.required, Validators.maxLength(35)]],
      cep: [funcionario.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      cidade: [funcionario.cidade, [Validators.required, Validators.maxLength(30)]],
      estado: [funcionario.estado, [Validators.required]],
      endereco: [funcionario.endereco, [Validators.required, Validators.maxLength(70)]],
      numero: [funcionario.numero, [Validators.required, Validators.min(1), Validators.max(9999)]],
      bairro: [funcionario.bairro, [Validators.required, Validators.maxLength(30)]],
      complemento: [funcionario.complemento, [Validators.maxLength(70)]]
    });
    const fields = ['cpf', 'telefoneResidencial', 'telefoneCelular', 'cep'];
    fields.forEach(field => {
      if (this.form.get(field).value != null) {
        this.applyMaskToInput(field);
      }
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    const funcionario: Funcionario = this.unformatData(this.form.value);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.funcionariosService.update(funcionario)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar funcionário!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('funcionário atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.funcionariosService.create(funcionario)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar funcionário!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('funcionário cadastrado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/funcionarios'], { queryParams: { pagina: 1}});
  }

  applyMaskToInput(mask: string): void {
    let value = this.form.get(mask).value;
    let maskedValue = this.maskService.applyMask(mask, value);
    this.form.get(mask).setValue(maskedValue);
  }

  searchCep(): void {
    const cep = this.form.get('cep').value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => {
          this.populateData(dados);
        });
    }
  }

  private populateData(dados): void {
    this.form.patchValue({
      cidade: dados.localidade,
      estado: dados.uf,
      endereco: dados.logradouro,
      bairro: dados.bairro,
      complemento: dados.complemento
    });
    this.form.get('cidade').markAsTouched();
    this.form.get('estado').markAsTouched();
    this.form.get('endereco').markAsTouched();
    this.form.get('bairro').markAsTouched();
    this.form.get('complemento').markAsTouched();
  }

  private unformatData(funcionario: Funcionario): Funcionario {
    if (this.form.get('cpf').value != null) {
      funcionario.cpf = this.maskService.undoMask(this.form.get('cpf').value);
    }
    if (this.form.get('telefoneResidencial').value != null) {
      funcionario.telefoneResidencial = this.maskService.undoMask(this.form.get('telefoneResidencial').value);
    }
    if (this.form.get('telefoneCelular').value != null) {
      funcionario.telefoneCelular = this.maskService.undoMask(this.form.get('telefoneCelular').value);
    }
    if (this.form.get('cep').value != null) {
      funcionario.cep = this.maskService.undoMask(this.form.get('cep').value);
    }
    return funcionario;
  }

}



