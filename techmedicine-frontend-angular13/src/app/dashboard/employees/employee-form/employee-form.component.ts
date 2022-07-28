import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { Role } from 'src/app/dashboard/roles/models/role';
import { State } from 'src/app/shared/models/states';
import { CepSearchService } from 'src/app/shared/services/cep-search.service';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends FormService implements OnInit {
  employee: Employee;
  states$: Observable<State[]>;
  roles: Role[];
  rolesLoading: boolean = true;
  compareFn(c1: Role, c2: Role): boolean {
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
    private employeeService: EmployeeService,
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
    this.employee = this.maskService.formatData(
      this.route.snapshot.data['employee']
    );
    this.dropdownService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      complete: () => {
        this.rolesLoading = false;
      }
    });
    this.states$ = this.dropdownService.getStates();
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [this.employee.id],
      name: [
        this.employee.name,
        [Validators.required, Validators.maxLength(20)]
      ],
      surname: [
        this.employee.surname,
        [Validators.required, Validators.maxLength(50)]
      ],
      birthDate: [
        this.employee.birthDate
          ? this.dateService.createDateObject(this.employee.birthDate, false)
          : this.employee.birthDate,
        [Validators.required]
      ],
      gender: [
        this.employee.gender,
        [Validators.required, Validators.maxLength(9)]
      ],
      role: [this.employee.role, [Validators.required]],
      rg: [this.employee.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [
        this.employee.cpf,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      homePhone: [
        this.employee.homePhone,
        [Validators.minLength(14), Validators.maxLength(14)]
      ],
      mobilePhone: [
        this.employee.mobilePhone,
        [
          Validators.minLength(15),
          Validators.required,
          Validators.maxLength(15)
        ]
      ],
      email: [
        this.employee.email,
        [Validators.required, Validators.maxLength(35)]
      ],
      cep: [
        this.employee.cep,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      ],
      city: [
        this.employee.city,
        [Validators.required, Validators.maxLength(30)]
      ],
      state: [this.employee.state, [Validators.required]],
      address: [
        this.employee.address,
        [Validators.required, Validators.maxLength(70)]
      ],
      number: [
        this.employee.number,
        [Validators.required, Validators.min(1), Validators.max(9999)]
      ],
      district: [
        this.employee.district,
        [Validators.required, Validators.maxLength(30)]
      ],
      complement: [this.employee.complement, [Validators.maxLength(70)]]
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
      const employee: Employee = this.createObject();
      if (this.form.value['id']) {
        this.employeeService.update(employee).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Funcionário atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/funcionarios'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao atualizar funcionário!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      } else {
        this.employeeService.create(employee).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Funcionário cadastrado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/funcionarios'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao cadastrar funcionário!',
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

  private createObject(): Employee {
    const employee: Employee = this.maskService.unformatData({
      ...this.form.value
    });
    this.dateService.toISODateString(employee);
    return employee;
  }
}
