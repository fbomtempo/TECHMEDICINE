import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Medico } from 'src/app/medicos/medico';
import { MedicosService } from 'src/app/medicos/medicos.service';
import { Paciente } from 'src/app/pacientes/paciente';
import { PacientesService } from 'src/app/pacientes/pacientes.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Agendamento } from '../agendamento';
import { AgendamentosService } from '../agendamentos.service';

@Component({
  selector: 'app-agendamentos-form',
  templateUrl: './agendamentos-form.component.html',
  styleUrls: ['./agendamentos-form.component.css']
})
export class AgendamentosFormComponent extends FormService implements OnInit {

  fullTimestamp: string;
  date: string;
  startTime: string;
  endTime: string;
  pacientes$: Observable<Paciente[]>;
  medicos$: Observable<Medico[]>;

  constructor(
    private route: ActivatedRoute,
    private pacientesService: PacientesService,
    private medicosService: MedicosService,
    private modalService: ModalService,
    private agendamentosService: AgendamentosService,
    protected override formBuilder: FormBuilder,
    protected override router: Router,
    protected override location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.fullTimestamp = this.route.snapshot.params['data'];
    this.date = this.fullTimestamp.slice(0, 10);
    this.startTime = this.fullTimestamp.slice(11, 16);
    this.endTime = this.fullTimestamp.slice(17);

    this.pacientes$ = this.pacientesService.findAll();
    this.medicos$ = this.medicosService.findAll();
    this.formType = 'Novo';

    this.form = this.formBuilder.group({
      id: [null],
      data: [this.date, Validators.required],
      horario: [this.startTime + '-' + this.endTime, Validators.required],
      paciente: [null, Validators.required],
      medico: [null, Validators.required],
      situacaoAgendamento: [null]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    const agendamento: Agendamento = this.createAgendamento(this.form.value);
    //console.log(agendamento);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.agendamentosService.update(agendamento)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar agendamento!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Agendamento atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.agendamentosService.create(agendamento)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao realizar agendamento!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Agendamento realizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/agendamentos']);
  }

  private createAgendamento(data: any): Agendamento {
    const horarios: string[] = data.horario.split('-');
    return {
      id: null,
      dataAgendada: data.data + 'T' + horarios[0],
      dataTermino: data.data + 'T' + horarios[1],
      paciente: data.paciente,
      medico: data.medico,
      situacaoAgendamento: 'AGENDADO'
    };
  }
}
