import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Specialty } from 'src/app/specialties/model/specialty';
import { State } from 'src/app/shared/models/states';
import { CepSearchService } from 'src/app/shared/services/cep-search.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Medic } from '../model/medic';
import { MedicService } from '../service/medic.service';

@Component({
  selector: 'app-medic-form',
  templateUrl: './medic-form.component.html',
  styleUrls: ['./medic-form.component.css']
})
export class MedicFormComponent extends FormService implements OnInit {

  states$: Observable<State[]>;
  specialties$: Observable<Specialty[]>;
  compareFn(c1: Specialty, c2: Specialty): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private medicService: MedicService,
    private modalService: ModalService,
    private cepService: CepSearchService,
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
    this.states$ = this.dropdownService.getStates();
    this.specialties$ = this.dropdownService.getSpecialties();
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    let medic = this.route.snapshot.data['medic'];

    this.form = this.formBuilder.group({
      id: [medic.id],
      name: [medic.name, [Validators.required, Validators.maxLength(20)]],
      surname: [medic.surname, [Validators.required, Validators.maxLength(50)]],
      birthDate: [medic.birthDate, [Validators.required]],
      gender: [medic.gender, [Validators.required, Validators.maxLength(9)]],
      crm: [medic.crm, [Validators.required, Validators.maxLength(12)]],
      specialty: [medic.specialty, [Validators.required]],
      rg: [medic.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [medic.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      homePhone: [medic.homePhone, [Validators.minLength(14), Validators.maxLength(14)]],
      mobilePhone: [medic.mobilePhone, [Validators.minLength(15), Validators.required, Validators.maxLength(15)]],
      email: [medic.email, [Validators.required, Validators.maxLength(35)]],
      cep: [medic.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      city: [medic.city, [Validators.required, Validators.maxLength(30)]],
      state: [medic.state, [Validators.required]],
      address: [medic.address, [Validators.required, Validators.maxLength(70)]],
      number: [medic.number, [Validators.required, Validators.min(1), Validators.max(9999)]],
      district: [medic.district, [Validators.required, Validators.maxLength(30)]],
      complement: [medic.complement, [Validators.maxLength(70)]]
    });
    const fields = ['cpf', 'homePhone', 'mobilePhone', 'cep'];
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
    const medic: Medic = this.unformatData(this.form.value);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.medicService.update(medic)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar médico!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Médico atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['/medicos'], { queryParams: { pagina: 1}}), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.medicService.create(medic)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar médico!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Médico cadastrado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['/medicos'], { queryParams: { pagina: 1}}), 2000);
              this.submittedSucess = true;
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
      this.cepService.searchCEP(cep)
        .subscribe(data => {
          this.populateData(data);
        });
    }
  }

  private populateData(data): void {
    this.form.patchValue({
      city: data.localidade,
      state: data.uf,
      address: data.logradouro,
      district: data.bairro,
      complement: data.complemento
    });
    this.form.get('city').markAsTouched();
    this.form.get('state').markAsTouched();
    this.form.get('address').markAsTouched();
    this.form.get('district').markAsTouched();
    this.form.get('complement').markAsTouched();
  }

  private unformatData(medic: Medic): Medic {
    if (this.form.get('cpf').value != null) {
      medic.cpf = this.maskService.undoMask(this.form.get('cpf').value);
    }
    if (this.form.get('homePhone').value != null) {
      medic.homePhone = this.maskService.undoMask(this.form.get('homePhone').value);
    }
    if (this.form.get('mobilePhone').value != null) {
      medic.mobilePhone = this.maskService.undoMask(this.form.get('mobilePhone').value);
    }
    if (this.form.get('cep').value != null) {
      medic.cep = this.maskService.undoMask(this.form.get('cep').value);
    }
    return medic;
  }

}


