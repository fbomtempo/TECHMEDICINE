import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Icd } from '../model/icd';
import { IcdService } from '../service/icd.service';

@Component({
  selector: 'app-icd-form',
  templateUrl: './icd-form.component.html',
  styleUrls: ['./icd-form.component.css']
})
export class IcdFormComponent extends FormService implements OnInit {
  icd: Icd;

  constructor(
    private formBuilder: FormBuilder,
    private icdService: IcdService,
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
    this.icd = this.route.snapshot.data['icd'];
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Nova';
    this.form = this.formBuilder.group({
      id: [this.icd.id],
      description: [
        this.icd.description,
        [Validators.required, Validators.maxLength(45)]
      ]
    });
    this.subscribeToChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.icdService.update(this.form.value).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao atualizar especialidade!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Especialidade atualizada com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['especialidades'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          }
        });
      } else {
        this.icdService.create(this.form.value).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao cadastrar doença!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Doença cadastrada com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['doencas'], {
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
}
