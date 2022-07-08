import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Role } from '../model/role';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent extends FormService implements OnInit {
  role: Role;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
    this.createForm();
  }

  fetchData(): void {
    this.role = this.route.snapshot.data['role'];
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [this.role.id],
      description: [
        this.role.description,
        [Validators.required, Validators.maxLength(35)]
      ]
    });
    this.subscribeToChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.roleService.update(this.form.value).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao atualizar cargi!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Cargo atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['cargos'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          }
        });
      } else {
        this.roleService.create(this.form.value).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao cadastrar cargo!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Cargo cadastrado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['cargos'], {
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
    this.router.navigate(['cargos'], { queryParams: { pagina: 1 } });
  }
}
