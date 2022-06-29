import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/roles/model/role';
import { State } from 'src/app/shared/models/states';
import { CepSearchService } from 'src/app/shared/services/cep-search.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent extends FormService implements OnInit {
  states$: Observable<State[]>;
  roles: Role[];
  rolesLoading: boolean = true;
  compareFn(c1: Role, c2: Role): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private cepService: CepSearchService,
    private maskService: MaskService,
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
    this.states$ = this.dropdownService.getStates();
    this.dropdownService.getRoles().subscribe({
      next: (roles: Role[]) => (this.roles = roles),
      complete: () => (this.rolesLoading = false)
    });
  }

  private createForm(): void {
    const employee = this.maskService.formatData(
      this.route.snapshot.data['employee'],
      ['cpf', 'homePhone', 'mobilePhone', 'cep']
    );
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [employee.id],
      name: [employee.name, [Validators.required, Validators.maxLength(20)]],
      surname: [
        employee.surname,
        [Validators.required, Validators.maxLength(50)]
      ],
      birthDate: [employee.birthDate, [Validators.required]],
      gender: [employee.gender, [Validators.required, Validators.maxLength(9)]],
      role: [employee.role, [Validators.required]],
      rg: [employee.rg, [Validators.required, Validators.maxLength(12)]],
      cpf: [
        employee.cpf,
        [
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]
      ],
      homePhone: [
        employee.homePhone,
        [Validators.minLength(14), Validators.maxLength(14)]
      ],
      mobilePhone: [
        employee.mobilePhone,
        [
          Validators.minLength(15),
          Validators.required,
          Validators.maxLength(15)
        ]
      ],
      email: [employee.email, [Validators.required, Validators.maxLength(35)]],
      cep: [
        employee.cep,
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)]
      ],
      city: [employee.city, [Validators.required, Validators.maxLength(30)]],
      state: [employee.state, [Validators.required]],
      address: [
        employee.address,
        [Validators.required, Validators.maxLength(70)]
      ],
      number: [
        employee.number,
        [Validators.required, Validators.min(1), Validators.max(9999)]
      ],
      district: [
        employee.district,
        [Validators.required, Validators.maxLength(30)]
      ],
      complement: [employee.complement, [Validators.maxLength(70)]]
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
    const employee: Employee = this.maskService.unformatData(this.form.value, [
      'cpf',
      'homePhone',
      'mobilePhone',
      'cep'
    ]);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.employeeService.update(employee).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao atualizar funcionário!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
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
          }
        });
      } else {
        this.employeeService.create(employee).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao cadastrar funcionário!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
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
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/funcionarios'], { queryParams: { pagina: 1 } });
  }
}
