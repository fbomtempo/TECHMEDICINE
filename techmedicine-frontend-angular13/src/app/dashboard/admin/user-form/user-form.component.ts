import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/models/states';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Role } from '../../roles/models/role';
import { Permission } from '../models/permission';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends FormService implements OnInit {
  @Input() user: User;
  states$: Observable<State[]>;
  permissions: Permission[];
  permissionsLoading: boolean = true;
  compareFn(c1: Permission, c2: Permission): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  datepickerConfig: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };
  @Output() clearUser: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private dropdownService: DropdownService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.clearUser.emit();
  }

  private fetchData(): void {
    this.dropdownService.getPermissions().subscribe({
      next: (permissions: Permission[]) => {
        this.permissions = permissions;
      },
      complete: () => {
        this.permissionsLoading = false;
      }
    });
  }

  private createForm(): void {
    const user: any = this.user ? this.user : {};
    this.form = this.formBuilder.group({
      id: [user.id],
      username: [
        user.username,
        [Validators.required, Validators.maxLength(20)]
      ],
      password: [user.password, [Validators.maxLength(16)]],
      permissions: [user.permissions, [Validators.required]]
    });
    this.subscribeToChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      const user: User = this.form.value;
      if (this.form.value['id']) {
        this.userService.update(user).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Usuário atualizado com sucesso!',
              'Redirecionando a página...'
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao atualizar usuário!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      } else {
        this.userService.create(user).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Usuário cadastrado com sucesso!',
              'Redirecionando a página...'
            );
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao cadastrar usuário!',
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
}
