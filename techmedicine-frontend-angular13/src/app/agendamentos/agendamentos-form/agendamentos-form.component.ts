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
    let fullTimestamp: string = this.route.snapshot.params['data'];
    const data = fullTimestamp.slice(0, 10);
    const horario = fullTimestamp.slice(11);
    this.pacientes$ = this.pacientesService.findAll();
    this.medicos$ = this.medicosService.findAll();
    this.formType = 'Novo';

    /*this.pacientesService.findAll()
      .pipe(
        take(1)
      )
      .subscribe(pacientes => {
        this.pacientes = pacientes;
        let test: string[];
        test = pacientes.map(paciente => paciente.nome.concat(' ', paciente.sobrenome))
        console.log(test);
        console.log(this.pacientes);
      });*/

    this.form = this.formBuilder.group({
      id: [null],
      data: [data, Validators.required],
      horario: [horario, Validators.required],
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
    console.log(agendamento);
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

  private createAgendamento(dados): Agendamento {
    return {
      id: null,
      dataAgendada: dados.data + 'T' + dados.horario,
      paciente: dados.paciente,
      medico: dados.medico,
      situacaoAgendamento: 'AGENDADO'
    }
  }
}


  /*select(paciente: Paciente) {
    this.form.patchValue({
      paciente: paciente
    });
  }

  selected?: Paciente;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];*/
