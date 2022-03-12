import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CargosService } from '../cargos.service';

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.css']
})
export class CargosFormComponent extends FormService implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private cargosService: CargosService,
    private modalService: ModalService,
    formBuilder: FormBuilder,
    router: Router,
    location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    const cargo = this.route.snapshot.data['cargo'];
    this.form = this.formBuilder.group({
      id: [cargo.id],
      descricao: [cargo.descricao, [Validators.required, Validators.maxLength(35)]]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.value['id']) {
        this.cargosService.update(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar cargi!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Cargo atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.cargosService.create(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar cargo!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Cargo cadastrado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      }
    }
  }

  onCancel(): void {
    this.location.back()
    //this.router.navigate(['/cargos'], { queryParams: { pagina: 1}});
  }

}

