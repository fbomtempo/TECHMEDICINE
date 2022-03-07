import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormSerivce } from 'src/app/shared/services/form-service';
import { Location } from '@angular/common';
import { PacientesService } from '../pacientes.service';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/shared/models/estado';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { Paciente } from '../paciente';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.css']
})
export class PacientesFormComponent extends FormSerivce implements OnInit {

  estados$: Observable<Estado[]>;
  readonly fields = ['cpf', 'telefoneResidencial', 'telefoneCelular', 'cep'];

  constructor(
    private pacientesService: PacientesService,
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
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    let paciente = this.route.snapshot.data['paciente'];

    this.form = this.formBuilder.group({
      id: [paciente.id],
      nome: [paciente.nome, [Validators.required, Validators.maxLength(20)]],
      sobrenome: [paciente.sobrenome, [Validators.required, Validators.maxLength(50)]],
      nascimento: [paciente.nascimento, [Validators.required]],
      sexo: [paciente.sexo, [Validators.required, Validators.maxLength(9)]],
      rg: [paciente.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [paciente.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      telefoneResidencial: [paciente.telefoneResidencial, [Validators.minLength(14), Validators.maxLength(14)]],
      telefoneCelular: [paciente.telefoneCelular, [Validators.minLength(15), Validators.required, Validators.maxLength(15)]],
      email: [paciente.email, [Validators.required, Validators.maxLength(35)]],
      cep: [paciente.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      cidade: [paciente.cidade, [Validators.required, Validators.maxLength(30)]],
      estado: [paciente.estado, [Validators.required]],
      endereco: [paciente.endereco, [Validators.required, Validators.maxLength(70)]],
      numero: [paciente.numero, [Validators.required, Validators.min(1), Validators.max(9999)]],
      bairro: [paciente.bairro, [Validators.required, Validators.maxLength(30)]],
      complemento: [paciente.complemento, [Validators.maxLength(70)]]
    });
    this.fields.forEach(field => {
      if (this.form.get(field).value != null) {
        this.applyMaskToInput(field);
      }
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    const paciente: Paciente = this.unformatData(this.form.value)
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.pacientesService.update(paciente)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar paciente!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Paciente atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      } else {
        this.pacientesService.create(paciente)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar paciente!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Paciente cadastrado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/pacientes'], { queryParams: { pagina: 1}});
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

  private unformatData(paciente: Paciente): Paciente {
    if (this.form.get('cpf').value != null) {
      paciente.cpf = this.maskService.undoMask(this.form.get('cpf').value);
    }
    if (this.form.get('telefoneResidencial').value != null) {
      paciente.telefoneResidencial = this.maskService.undoMask(this.form.get('telefoneResidencial').value);
    }
    if (this.form.get('telefoneCelular').value != null) {
      paciente.telefoneCelular = this.maskService.undoMask(this.form.get('telefoneCelular').value);
    }
    if (this.form.get('cep').value != null) {
      paciente.cep = this.maskService.undoMask(this.form.get('cep').value);
    }
    return paciente;
  }

}

