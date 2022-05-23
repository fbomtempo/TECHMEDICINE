import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Medic } from 'src/app/medics/model/medic';
import { MedicService } from 'src/app/medics/service/medic.service';
import { Patient } from 'src/app/patients/model/patient';
import { PatientService } from 'src/app/patients/service/patient.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
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

  timeslots: string[] = [
    '08:00-08:30',
    '08:30-09:00',
    '09:00-09:30',
    '09:30-10:00',
    '10:00-10:30',
    '10:30-11:00',
    '11:00-11:30',
    '11:30-12:00',
    '14:00-14:30',
    '14:30-15:00',
    '15:00-15:30',
    '15:30-16:00',
    '16:00-16:30',
    '16:30-17:00',
    '17:00-17:30',
    '17:30-18:00',
    '18:00-18:30',
    '18:30-19:00',
  ];
  date: string;
  startTime: string;
  endTime: string;
  timeslot: string;
  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  compareFnPatient(c1: Patient, c2: Patient): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private route: ActivatedRoute,
    private dropdownService: DropdownService,
    private modalService: ModalService,
    private appointmentService: AppointmentService,
    protected override formBuilder: FormBuilder,
    protected override router: Router,
    protected override location: Location
  ) {
    super(formBuilder, router, location);
  }

  ngOnInit(): void {
    this.patients$ = this.dropdownService.getPatients();
    this.medics$ = this.dropdownService.getMedics();
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    const appointment = this.route.snapshot.data['appointment'];

    const fullTimestamp = this.route.snapshot.queryParams['data'];
    this.formatTimestamp(appointment, fullTimestamp);

    this.form = this.formBuilder.group({
      id: [appointment.id],
      date: [this.date, [Validators.required]],
      timeslot: [this.timeslot, [Validators.required]],
      patient: [appointment.patient, [Validators.required]],
      medic: [appointment.medic, [Validators.required]],
    });
    this.form.valueChanges.subscribe(() => {
      this.changed = true;
    });
  }

  onSubmit(): void {
    const appointment: Appointment = this.createAppointment(this.form.value);
    this.submitted = true;
    console.log(appointment)
    /*if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.appointmentService.update(appointment)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao atualizar agendamento!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Agendamento atualizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['/agendamentos']), 2000);
              this.submittedSucess = true;
            }
          });
      } else {
        this.appointmentService.create(appointment)
          .subscribe({
            error: () => this.modalService.alertDanger('Erro ao realizar agendamento!', 'Tente novamente mais tarde.'),
            complete: () => {
              this.modalService.alertSuccess('Agendamento realizado com sucesso!', 'Redirecionando a página...');
              setTimeout(() => this.router.navigate(['/agendamentos']), 2000);
              this.submittedSucess = true;
            }
          });
      }
    }*/
  }

  onCancel(): void {
    this.router.navigate(['agendamentos']);
  }

  private createAppointment(data: any): Appointment {
    const times: string[] = data.timeslot.split('-');
    return {
      id: data.id,
      patient: data.patient,
      medic: data.medic,
      scheduledTimestamp: data.date + 'T' + times[0],
      endTimestamp: data.date + 'T' + times[1],
      appointmentSituation: null
    };
  }

  private formatTimestamp(appointment: Appointment, fullTimestamp: string): void {
    if (fullTimestamp) {
      this.date =fullTimestamp.slice(0, 10);
      this.startTime = fullTimestamp.slice(11, 16);
      this.endTime = fullTimestamp.slice(17);
      this.timeslot = this.startTime + '-' + this.endTime;
      return;
    } else if (appointment.id) {
      this.date = appointment.scheduledTimestamp.slice(0, 10);
      this.startTime = appointment.scheduledTimestamp.slice(11, 16);
      this.endTime = appointment.endTimestamp.slice(11, 16);
      this.timeslot = this.startTime + '-' + this.endTime;
    } else {
      this.date = null;
      this.timeslot = null;
    }
  }

  applyValidationClassTest(field: string): any {
    return {
      'ng-untouched': !this.submitted,
      'ng-touched': this.submitted,
      'is-invalid': (this.submitted || this.isTouched(field) || this.isDirty(field)) && this.hasError(field),
      'is-valid': (this.submitted || this.isTouched(field) || this.isDirty(field)) && !this.hasError(field)
    }
  }

  log() {
    console.log(this.form.get('patient').value);
  }
}
