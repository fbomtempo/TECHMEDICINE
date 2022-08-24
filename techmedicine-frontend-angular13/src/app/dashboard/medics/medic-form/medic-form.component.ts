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
import { Specialty } from 'src/app/dashboard/specialties/models/specialty';

import { Medic } from '../models/medic';
import { MedicService } from '../services/medic.service';

@Component({
  selector: 'app-medic-form',
  templateUrl: './medic-form.component.html',
  styleUrls: ['./medic-form.component.css']
})
export class MedicFormComponent extends FormService implements OnInit {
  medic: Medic;
  states$: Observable<State[]>;
  specialties: Specialty[];
  specialtiesLoading: boolean = true;
  compareFn(c1: Specialty, c2: Specialty): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  datepickerConfig: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };

  constructor(
    private formBuilder: FormBuilder,
    private medicService: MedicService,
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
    this.medic = this.maskService.formatData(this.route.snapshot.data['medic']);
    this.dropdownService.getSpecialties().subscribe({
      next: (specialties: Specialty[]) => {
        this.specialties = specialties;
      },
      complete: () => {
        this.specialtiesLoading = false;
      }
    });
    this.states$ = this.dropdownService.getStates();
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [this.medic.id],
      name: [this.medic.name, [Validators.required, Validators.maxLength(20)]],
      surname: [
        this.medic.surname,
        [Validators.required, Validators.maxLength(50)]
      ],
      birthDate: [
        this.medic.birthDate
          ? this.dateService.createDateObject(this.medic.birthDate, false)
          : this.medic.birthDate,
        [Validators.required]
      ],
      gender: [
        this.medic.gender,
        [Validators.required, Validators.maxLength(9)]
      ],
      crm: [this.medic.crm, [Validators.required, Validators.maxLength(9)]],
      specialty: [this.medic.specialty, [Validators.required]],
      rg: [this.medic.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [
        this.medic.cpf,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      homePhone: [
        this.medic.homePhone,
        [Validators.minLength(14), Validators.maxLength(14)]
      ],
      mobilePhone: [
        this.medic.mobilePhone,
        [
          Validators.minLength(15),
          Validators.required,
          Validators.maxLength(15)
        ]
      ],
      email: [
        this.medic.email,
        [Validators.required, Validators.maxLength(35)]
      ],
      cep: [
        this.medic.cep,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      ],
      city: [this.medic.city, [Validators.required, Validators.maxLength(30)]],
      state: [this.medic.state, [Validators.required]],
      address: [
        this.medic.address,
        [Validators.required, Validators.maxLength(70)]
      ],
      number: [
        this.medic.number,
        [Validators.required, Validators.min(1), Validators.max(9999)]
      ],
      district: [
        this.medic.district,
        [Validators.required, Validators.maxLength(30)]
      ],
      complement: [this.medic.complement, [Validators.maxLength(70)]]
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
      const medic: Medic = this.createObject();
      if (this.form.value['id']) {
        this.medicService.update(medic).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Médico atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/medicos'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao atualizar médico!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      } else {
        this.medicService.create(medic).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Médico cadastrado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/medicos'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao cadastrar médico!',
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

  private createObject(): Medic {
    const medic: Medic = this.maskService.unformatData({ ...this.form.value });
    this.dateService.toISODateString(medic);
    return medic;
  }
}
