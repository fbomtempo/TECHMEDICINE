import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Disease } from '../model/disease';
import { DiseaseService } from '../service/disease.service';

@Component({
  selector: 'app-disease-form',
  templateUrl: './disease-form.component.html',
  styleUrls: ['./disease-form.component.css']
})
export class DiseaseFormComponent extends FormService implements OnInit {
  disease: Disease;

  constructor(
    private formBuilder: FormBuilder,
    private diseaseService: DiseaseService,
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
    this.disease = this.route.snapshot.data['disease'];
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Nova';
    this.form = this.formBuilder.group({
      id: [this.disease.id],
      description: [
        this.disease.description,
        [Validators.required, Validators.maxLength(45)]
      ]
    });
    this.subscribeToChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.diseaseService.update(this.form.value).subscribe({
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
        this.diseaseService.create(this.form.value).subscribe({
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
