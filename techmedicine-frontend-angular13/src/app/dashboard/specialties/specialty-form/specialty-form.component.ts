import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Specialty } from '../models/specialty';
import { SpecialtyService } from '../services/specialty.service';

@Component({
  selector: 'app-specialty-form',
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.css']
})
export class SpecialtyFormComponent extends FormService implements OnInit {
  specialty: Specialty;

  constructor(
    private formBuilder: FormBuilder,
    private specialtyService: SpecialtyService,
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
    this.specialty = this.route.snapshot.data['specialty'];
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Nova';
    this.form = this.formBuilder.group({
      id: [this.specialty.id],
      description: [
        this.specialty.description,
        [Validators.required, Validators.maxLength(45)]
      ]
    });
    this.subscribeToChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.specialtyService.update(this.form.value).subscribe({
          next: () => {
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
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao atualizar especialidade!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      } else {
        this.specialtyService.create(this.form.value).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Especialidade cadastrada com sucesso!',
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
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao cadastrar especialidade!',
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
