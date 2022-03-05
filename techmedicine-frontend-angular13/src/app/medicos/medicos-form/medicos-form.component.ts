import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Especialidade } from 'src/app/especialidades/especialidade';
import { Estado } from 'src/app/shared/models/estado';
import { ConsultaCepService } from 'src/app/shared/services/consulta-cep.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormSerivce } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MedicosService } from '../medicos.service';

@Component({
  selector: 'app-medicos-form',
  templateUrl: './medicos-form.component.html',
  styleUrls: ['./medicos-form.component.css']
})
export class MedicosFormComponent extends FormSerivce implements OnInit {

  estados$: Observable<Estado[]>;
  especialidades$: Observable<Especialidade[]>;
  keyword: string;
  initialValue: string;

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
    if(medico.nascimento != undefined) {
      this.reverseFormatDate(medico);
    }
    this.keyword = 'descricao';
    this.initialValue = (medico.especialidade != undefined) ? medico.especialidade.descricao : undefined;

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
      telefoneResidencial: [medico.cpf, [Validators.maxLength(14)]],
      telefoneCelular: [medico.cpf, [Validators.required, Validators.maxLength(15)]],
      email: [medico.cpf, [Validators.required, Validators.maxLength(35)]],
      cep: [medico.cep, [Validators.required, Validators.maxLength(9)]],
      cidade: [medico.cidade, [Validators.required, Validators.maxLength(30)]],
      estado: [medico.estado, [Validators.required]],
      endereco: [medico.endereco, [Validators.required, Validators.maxLength(70)]],
      numero: [medico.numero, [Validators.required, Validators.min(1), Validators.max(9999)]],
      bairro: [medico.bairro, [Validators.required, Validators.maxLength(30)]],
      complemento: [medico.complemento, [Validators.maxLength(70)]]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    this.form.get('nascimento').setValue(this.formatDate());
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.value['id']) {
        this.medicosService.update(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar médico!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Médico atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      } else {
        this.medicosService.create(this.form.value)
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

  searchCep() {
    const cep = this.form.get('cep').value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => {
          this.populateData(dados);
        });
    }
  }

  populateData(dados) {
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

  formatDate(): string {
    let date: Date = new Date(this.form.get('nascimento').value);
    let dateStr: string = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    return dateStr;
  }

  reverseFormatDate(medico: any): void {
    let dateArrayStr: string[] = medico.nascimento.split('/');
    let dateStr = `${dateArrayStr[2]}-${dateArrayStr[1]}-${dateArrayStr[0]}`;
    medico.nascimento = dateStr;
  }

  applyMaskToInput(mask: string): void {
    let value = this.form.get(mask).value;
    let maskedValue = this.maskService.applyMask(mask, value);
    this.form.get(mask).setValue(maskedValue);
  }

  selectEvent(item) {
    if (this.initialValue === undefined) {
      this.form.patchValue({
        especialidade: item
      });
    }
  }

  print() {
    console.log(this.form.value)
  }
}
