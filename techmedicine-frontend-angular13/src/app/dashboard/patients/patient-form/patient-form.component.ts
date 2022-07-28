import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/models/states';
import { CepSearchService } from 'src/app/shared/services/cep-search.service';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientsFormComponent extends FormService implements OnInit {
  patient: Patient;
  states$: Observable<State[]>;
  datepickerConfig: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private modalService: ModalService,
    private cepService: CepSearchService,
    private maskService: MaskService,
    private dateService: DateService,
    private dropdownService: DropdownService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
    this.createForm();
  }

  private fetchData(): void {
    this.patient = this.maskService.formatData(
      this.route.snapshot.data['patient']
    );
    this.states$ = this.dropdownService.getStates();
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [this.patient.id],
      name: [
        this.patient.name,
        [Validators.required, Validators.maxLength(20)]
      ],
      surname: [
        this.patient.surname,
        [Validators.required, Validators.maxLength(50)]
      ],
      birthDate: [
        this.patient.birthDate
          ? this.dateService.createDateObject(this.patient.birthDate, false)
          : this.patient.birthDate,
        [Validators.required]
      ],
      gender: [
        this.patient.gender,
        [Validators.required, Validators.maxLength(9)]
      ],
      rg: [this.patient.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [
        this.patient.cpf,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      homePhone: [
        this.patient.homePhone,
        [Validators.minLength(14), Validators.maxLength(14)]
      ],
      mobilePhone: [
        this.patient.mobilePhone,
        [
          Validators.minLength(15),
          Validators.required,
          Validators.maxLength(15)
        ]
      ],
      email: [
        this.patient.email,
        [Validators.required, Validators.maxLength(35), Validators.email]
      ],
      cep: [
        this.patient.cep,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      ],
      city: [
        this.patient.city,
        [Validators.required, Validators.maxLength(30)]
      ],
      state: [this.patient.state, [Validators.required]],
      address: [
        this.patient.address,
        [Validators.required, Validators.maxLength(70)]
      ],
      number: [
        this.patient.number,
        [Validators.required, Validators.min(1), Validators.max(9999)]
      ],
      district: [
        this.patient.district,
        [Validators.required, Validators.maxLength(30)]
      ],
      complement: [this.patient.complement, [Validators.maxLength(70)]]
    });
    this.subscribeToChanges();
  }

  applyMaskToInput(mask: string): void {
    let value = this.form.get(mask).value;
    let maskedValue = this.maskService.applyMask(mask, value);
    this.form.get(mask).setValue(maskedValue);
  }

  searchCep(): void {
    const cep = this.form.get('cep').value;
    if (cep != null && cep !== '') {
      this.cepService.searchCEP(cep).subscribe((data: any) => {
        this.populateData(data);
      });
    }
  }

  private populateData(data: any): void {
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

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      const patient: Patient = this.createObject();
      if (this.form.value['id']) {
        this.patientService.update(patient).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Paciente atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/pacientes'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao atualizar paciente!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      } else {
        this.patientService.create(patient).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Paciente cadastrado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/pacientes'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao cadastrar paciente!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      }
    }
  }

  private createObject(): Patient {
    const patient: Patient = this.maskService.unformatData({
      ...this.form.value
    });
    this.dateService.toISODateString(patient);
    return patient;
  }
}
