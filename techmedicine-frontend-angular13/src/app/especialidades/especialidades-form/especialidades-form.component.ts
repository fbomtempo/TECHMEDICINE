import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormSerivce } from 'src/app/shared/services/form-service';
import { EspecialidadesService } from '../especialidades.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-especialidades-form',
  templateUrl: './especialidades-form.component.html',
  styleUrls: ['./especialidades-form.component.css']
})
export class EspecialidadesFormComponent extends FormSerivce implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private especialidadesService: EspecialidadesService,
    private modalService: ModalService,
    formBuilder: FormBuilder,
    router: Router,
    location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Nova';
    const especialidade = this.route.snapshot.data['especialidade'];
    this.form = this.formBuilder.group({
      id: [especialidade.id],
      descricao: [especialidade.descricao, [Validators.required, Validators.maxLength(45)]]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.value['id']) {
        this.especialidadesService.update(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar especialidade!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Especialidade atualizada com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.especialidadesService.create(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar especialidade!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Especialidade cadastrada com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/especialidades'], { queryParams: { pagina: 1}});
  }

}
