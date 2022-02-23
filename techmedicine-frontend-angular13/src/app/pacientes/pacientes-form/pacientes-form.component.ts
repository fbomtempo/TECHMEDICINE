import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormSerivce } from 'src/app/shared/services/form-service';
import { Location } from '@angular/common';
import { PacientesService } from '../pacientes.service';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.css']
})
export class PacientesFormComponent extends FormSerivce implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private pacientesService: PacientesService,
    private modalService: ModalService,
    protected override formBuilder: FormBuilder,
    protected override router: Router,
    protected override location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    const paciente = this.route.snapshot.data['paciente'];
    this.form = this.formBuilder.group({
      id: [paciente.id],
      nome: [paciente.nome, [Validators.required, Validators.maxLength(45)]],
      sobrenome: [paciente.sobrenome, [Validators.required, Validators.maxLength(45)]],
      nascimento: [paciente.nascimento, [Validators.required, Validators.maxLength(45)]],
      sexo: [paciente.sexo, [Validators.required, Validators.maxLength(45)]],
      rg: [paciente.rg, [Validators.required, Validators.maxLength(45)]],
      cpf: [paciente.cpf, [Validators.required, Validators.maxLength(45)]]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  ngOnDestroy(): void {

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      if (this.form.value['id']) {
        this.pacientesService.update(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar paciente!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('paciente atualizada com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      } else {
        this.pacientesService.create(this.form.value)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao cadastrar paciente!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('paciente cadastrada com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/pacientes'], { queryParams: { pagina: 1}});
  }

}

