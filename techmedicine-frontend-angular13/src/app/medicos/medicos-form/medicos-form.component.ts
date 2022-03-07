import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Especialidade } from 'src/app/especialidades/especialidade';
import { Estado } from 'src/app/shared/models/estado';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormSerivce } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Medico } from '../medico';
import { MedicosService } from '../medicos.service';

@Component({
  selector: 'app-medicos-form',
  templateUrl: './medicos-form.component.html',
  styleUrls: ['./medicos-form.component.css']
})
export class MedicosFormComponent extends FormSerivce implements OnInit {

  estados$: Observable<Estado[]>;
  especialidades$: Observable<Especialidade[]>;
  compareFn(c1: Especialidade, c2: Especialidade): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private medicosService: MedicosService,
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
    this.especialidades$ = this.dropdownService.getEspecialidades();
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    let medico = this.route.snapshot.data['medico'];

    this.form = this.formBuilder.group({
      id: [medico.id],
      nome: [medico.nome, [Validators.required, Validators.maxLength(20)]],
      sobrenome: [medico.sobrenome, [Validators.required, Validators.maxLength(50)]],
      nascimento: [medico.nascimento, [Validators.required]],
      sexo: [medico.sexo, [Validators.required, Validators.maxLength(9)]],
      crm: [medico.crm, [Validators.required, Validators.maxLength(12)]],
      especialidade: [medico.especialidade, [Validators.required]],
      rg: [medico.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [medico.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      telefoneResidencial: [medico.telefoneResidencial, [Validators.minLength(14), Validators.maxLength(14)]],
      telefoneCelular: [medico.telefoneCelular, [Validators.minLength(15), Validators.required, Validators.maxLength(15)]],
      email: [medico.email, [Validators.required, Validators.maxLength(35)]],
      cep: [medico.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      cidade: [medico.cidade, [Validators.required, Validators.maxLength(30)]],
      estado: [medico.estado, [Validators.required]],
      endereco: [medico.endereco, [Validators.required, Validators.maxLength(70)]],
      numero: [medico.numero, [Validators.required, Validators.min(1), Validators.max(9999)]],
      bairro: [medico.bairro, [Validators.required, Validators.maxLength(30)]],
      complemento: [medico.complemento, [Validators.maxLength(70)]]
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
    const medico: Medico = this.unformatData(this.form.value);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.medicosService.update(medico)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar médico!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Médico atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      } else {
        this.medicosService.create(medico)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar médico!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Médico cadastrado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/medicos'], { queryParams: { pagina: 1}});
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

  private unformatData(medico: Medico): Medico {
    if (this.form.get('cpf').value != null) {
      medico.cpf = this.maskService.undoMask(this.form.get('cpf').value);
    }
    if (this.form.get('telefoneResidencial').value != null) {
      medico.telefoneResidencial = this.maskService.undoMask(this.form.get('telefoneResidencial').value);
    }
    if (this.form.get('telefoneCelular').value != null) {
      medico.telefoneCelular = this.maskService.undoMask(this.form.get('telefoneCelular').value);
    }
    if (this.form.get('cep').value != null) {
      medico.cep = this.maskService.undoMask(this.form.get('cep').value);
    }
    return medico;
  }

}


