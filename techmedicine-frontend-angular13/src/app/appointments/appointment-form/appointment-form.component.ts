import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Medic } from 'src/app/medics/model/medic';
import { MedicService } from 'src/app/medics/service/medic.service';
import { Patient } from 'src/app/patients/model/patient';
import { PatientService } from 'src/app/patients/service/patient.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent extends FormService implements OnInit {

  fullTimestamp: string;
  date: string;
  startTime: string;
  endTime: string;
  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medicService: MedicService,
    private modalService: ModalService,
    private appointmentService: AppointmentService,
    protected override formBuilder: FormBuilder,
    protected override router: Router,
    protected override location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.fullTimestamp = this.route.snapshot.queryParams['data'];
    this.date = this.fullTimestamp.slice(0, 10);
    this.startTime = this.fullTimestamp.slice(11, 16);
    this.endTime = this.fullTimestamp.slice(17);

    this.patients$ = this.patientService.findAll();
    this.medics$ = this.medicService.findAll();
    this.formType = 'Novo';

    this.form = this.formBuilder.group({
      id: [null],
      date: [this.date, Validators.required],
      time: [this.startTime + '-' + this.endTime, Validators.required],
      patient: [null, Validators.required],
      medic: [null, Validators.required],
      situacaoAgendamento: [null]
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    const agendamento: Appointment = this.createAgendamento(this.form.value);
    //console.log(agendamento);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.appointmentService.update(agendamento)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar agendamento!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Agendamento atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.location.back(), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.appointmentService.create(agendamento)
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
    this.router.navigate(['agendamentos']);
  }

  private createAgendamento(data: any): Appointment {
    const timestamps: string[] = data.time.split('-');
    return {
      id: null,
      patient: data.patient,
      medic: data.medic,
      scheduledTimestamp: data.date + 'T' + timestamps[0],
      endTimestamp: data.date + 'T' + timestamps[1],
      appointmentSituation: 'AGENDADO'
    };
  }
}
