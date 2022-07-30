import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Observable } from 'rxjs';
import { State } from 'src/app/shared/models/states';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Permission } from '../models/permission';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent
  extends FormService
  implements OnInit, OnDestroy
{
  @Input() user: User;
  userForm: any;
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
  @Output() userSaved: EventEmitter<void> = new EventEmitter();

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
    if (this.changed) {
      if (
        confirm(
          'Tem certeza que deseja sair? Os dados preenchidos serão perdidos.'
        )
      ) {
        this.changed = false;
        this.clearUser.emit();
      }
    } else {
      this.clearUser.emit();
    }
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
    this.userForm = this.user ? this.user : {};
    this.form = this.formBuilder.group({
      id: [this.userForm.id],
      username: [
        this.userForm.username,
        [Validators.required, Validators.maxLength(20)]
      ],
      password: [this.userForm.id ? null : '#1234', [Validators.maxLength(16)]],
      permissions: [this.userForm.permissions, [Validators.required]]
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
            setTimeout(() => {
              this.userSaved.emit();
            }, 2000);
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
            setTimeout(() => {
              this.userSaved.emit();
            }, 2000);
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
