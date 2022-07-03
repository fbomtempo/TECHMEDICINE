import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { map } from 'rxjs';
import { Medic } from 'src/app/medics/model/medic';
import { Patient } from 'src/app/patients/model/patient';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent extends FormService implements OnInit {
  datepickerConfig: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };
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
    '18:30-19:00'
  ];
  date: Date;
  timeslot: string;
  patients: Patient[];
  patientsLoading: boolean = true;
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnPatient(c1: Patient, c2: Patient): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private modalService: ModalService,
    private dropdownService: DropdownService,
    private maskService: MaskService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
    this.createForm();
  }

  private fetchData(): void {
    this.dropdownService
      .getPatients()
      .pipe(
        map((patients: Patient[]) => {
          return patients.map((patient: Patient) => {
            return this.maskService.formatData(patient, ['cpf', 'mobilePhone']);
          });
        })
      )
      .subscribe({
        next: (patients: Patient[]) => {
          this.patients = patients.map((patient: any) => {
            patient.searchLabel = `${patient.name} ${patient.surname}`;
            return patient;
          });
        },
        complete: () => (this.patientsLoading = false)
      });
    this.dropdownService
      .getMedics()
      .pipe(
        map((medics: Medic[]) => {
          return medics.map((medic: Medic) => {
            return this.maskService.formatData(medic, ['mobilePhone']);
          });
        })
      )
      .subscribe((medics: Medic[]) => {
        this.medics = medics.map((medic: any) => {
          medic.searchLabel = `${medic.name} ${medic.surname}`;
          return medic;
        });
        this.medicsLoading = false;
      });
  }

  private createForm(): void {
    const appointment = this.route.snapshot.data['appointment'];
    const fullTimestamp = this.route.snapshot.queryParams['data'];
    this.formatTimestamp(appointment, fullTimestamp);
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [appointment.id],
      date: [this.date, [Validators.required]],
      timeslot: [this.timeslot, [Validators.required]],
      patient: [appointment.patient, [Validators.required]],
      medic: [appointment.medic, [Validators.required]],
      appointmentSituation: [appointment.appointmentSituation]
    });
    this.subscribeToChanges();
  }

  private formatTimestamp(
    appointment: Appointment,
    fullTimestamp: string
  ): void {
    if (fullTimestamp) {
      const dateTime: string[] = fullTimestamp.split('T');
      const times: string[] = dateTime[1].split('-');
      this.date = this.dateService.createDateObject(dateTime[0]);
      this.timeslot = `${times[0]}-${times[1]}`;
      return;
    } else if (appointment.id) {
      const date: string = appointment.scheduledTimestamp.slice(0, 16);
      const times: string[] = [];
      times.push(appointment.scheduledTimestamp.split('T')[1].slice(0, 5));
      times.push(appointment.endTimestamp.split('T')[1].slice(0, 5));
      this.date = this.dateService.createDateObject(date);
      this.timeslot = `${times[0]}-${times[1]}`;
    } else {
      this.date = null;
      this.timeslot = null;
    }
  }

  onSubmit(): void {
    const appointment: Appointment = this.createObject(this.form.value);
    this.submitted = true;
    if (this.form.valid && this.changed) {
      if (this.form.value['id']) {
        this.appointmentService.update(appointment).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao atualizar agendamento!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Agendamento atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(() => this.router.navigate(['/agendamentos']), 2000);
            this.submittedSucess = true;
          }
        });
      } else {
        this.appointmentService.create(appointment).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao realizar agendamento!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Agendamento realizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(() => this.router.navigate(['/agendamentos']), 2000);
            this.submittedSucess = true;
          }
        });
      }
    }
  }

  private createObject(form: any): Appointment {
    const { date, timeslot, ...appointment } = form;
    const dateStr = date.toISOString().slice(0, 11);
    const times: string[] = timeslot.split('-');
    appointment.scheduledTimestamp = `${dateStr}${times[0]}`;
    appointment.endTimestamp = `${dateStr}${times[1]}`;
    return appointment;
  }

  onCancel(): void {
    this.router.navigate(['agendamentos']);
  }
}
