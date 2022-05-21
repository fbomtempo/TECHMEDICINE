import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormService } from 'src/app/shared/services/form-service';
import { SpecialtyService } from '../service/specialty.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specialty-form',
  templateUrl: './specialty-form.component.html',
  styleUrls: ['./specialty-form.component.css']
})
export class SpecialtyFormComponent extends FormService implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private specialtyService: SpecialtyService,
    private modalService: ModalService,
    formBuilder: FormBuilder,
    router: Router,
    location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Nova';
    const specialty = this.route.snapshot.data['specialty'];

    this.form = this.formBuilder.group({
      id: [specialty.id],
      description: [specialty.description, [Validators.required, Validators.maxLength(45)]]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.value['id']) {
        this.specialtyService.update(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar especialidade!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Especialidade atualizada com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['especialidades'], { queryParams: { pagina: 1 }}), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.specialtyService.create(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar especialidade!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Especialidade cadastrada com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['especialidades'], { queryParams: { pagina: 1 }}), 2000);
              this.submittedSucess = true;
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['especialidades'], { queryParams: { pagina: 1 }});
  }

}
