import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormService } from 'src/app/shared/services/form-service';
import { Location } from '@angular/common';
import { PatientService } from '../service/patient.service';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/models/states';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { CepSearchService } from 'src/app/shared/services/cep-search.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { Patient } from '../model/patient';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientsFormComponent extends FormService implements OnInit {

  states$: Observable<State[]>;

  constructor(
    private patientService: PatientService,
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
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    const patient = this.route.snapshot.data['patient'];

    this.form = this.formBuilder.group({
      id: [patient.id],
      name: [patient.name, [Validators.required, Validators.maxLength(20)]],
      surname: [patient.surname, [Validators.required, Validators.maxLength(50)]],
      birthDate: [patient.birthDate, [Validators.required]],
      gender: [patient.gender, [Validators.required, Validators.maxLength(9)]],
      rg: [patient.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [patient.cpf, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      homePhone: [patient.homePhone, [Validators.minLength(14), Validators.maxLength(14)]],
      mobilePhone: [patient.mobilePhone, [Validators.minLength(15), Validators.required, Validators.maxLength(15)]],
      email: [patient.email, [Validators.required, Validators.maxLength(35)]],
      cep: [patient.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      city: [patient.city, [Validators.required, Validators.maxLength(30)]],
      state: [patient.state, [Validators.required]],
      address: [patient.address, [Validators.required, Validators.maxLength(70)]],
      number: [patient.number, [Validators.required, Validators.min(1), Validators.max(9999)]],
      district: [patient.district, [Validators.required, Validators.maxLength(30)]],
      complement: [patient.complement, [Validators.maxLength(70)]]
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
    const patient: Patient = this.unformatData(this.form.value)
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.patientService.update(patient)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar paciente!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Paciente atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['/pacientes'], { queryParams: { pagina: 1}}), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.patientService.create(patient)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar paciente!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Paciente cadastrado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['/pacientes'], { queryParams: { pagina: 1}}), 2000);
              this.submittedSucess = true;
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

  private unformatData(patient: Patient): Patient {
    if (this.form.get('cpf').value != null) {
      patient.cpf = this.maskService.undoMask(this.form.get('cpf').value);
    }
    if (this.form.get('homePhone').value != null) {
      patient.homePhone = this.maskService.undoMask(this.form.get('homePhone').value);
    }
    if (this.form.get('mobilePhone').value != null) {
      patient.mobilePhone = this.maskService.undoMask(this.form.get('mobilePhone').value);
    }
    if (this.form.get('cep').value != null) {
      patient.cep = this.maskService.undoMask(this.form.get('cep').value);
    }
    return patient;
  }

}

