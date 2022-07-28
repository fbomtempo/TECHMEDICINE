import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Medic } from 'src/app/dashboard/medics/models/medic';
import { Patient } from 'src/app/dashboard/patients/models/patient';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Appointment } from '../models/appointment';
import { AppointmentService } from '../services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent extends FormService implements OnInit {
  appointment: Appointment;
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
  timestamp: string;
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
    this.appointment = this.route.snapshot.data['appointment'];
    this.dropdownService.getPatients().subscribe({
      next: (patients: Patient[]) => {
        this.patients = patients.map((patient: any) => {
          patient.searchLabel = `${patient.name} ${patient.surname}`;
          return patient;
        });
      },
      complete: () => {
        this.patientsLoading = false;
      }
    });
    this.dropdownService.getMedics().subscribe({
      next: (medics: Medic[]) => {
        this.medics = medics.map((medic: any) => {
          medic.searchLabel = `${medic.name} ${medic.surname}`;
          return medic;
        });
      },
      complete: () => {
        this.medicsLoading = false;
      }
    });
  }

  private createForm(): void {
    this.timestamp = this.route.snapshot.queryParams['data'];
    this.formatTimestamp();
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [this.appointment.id],
      date: [this.date, [Validators.required]],
      timeslot: [this.timeslot, [Validators.required]],
      patient: [this.appointment.patient, [Validators.required]],
      medic: [this.appointment.medic, [Validators.required]]
    });
    this.subscribeToChanges();
  }

  private formatTimestamp(): void {
    if (this.timestamp) {
      const dateTime: string[] = this.timestamp.split('T');
      const times: string[] = dateTime[1].split('-');
      this.date = this.dateService.createDateObject(dateTime[0], false);
      this.timeslot = `${times[0]}-${times[1]}`;
    } else if (this.appointment.id) {
      const date: string = this.appointment.scheduledDate;
      const times: string[] = [
        this.appointment.startTime,
        this.appointment.endTime
      ];
      this.date = this.dateService.createDateObject(date, false);
      this.timeslot = `${times[0]}-${times[1]}`;
    } else {
      this.date = null;
      this.timeslot = null;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      const appointment: Appointment = this.createObject();
      if (this.form.value['id']) {
        this.appointmentService.update(appointment).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Agendamento atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(() => this.router.navigate(['/agendamentos']), 2000);
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao atualizar agendamento!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      } else {
        this.appointmentService.create(appointment).subscribe({
          next: () => {
            this.modalService.alertSuccess(
              'Agendamento realizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(() => this.router.navigate(['/agendamentos']), 2000);
            this.submittedSucess = true;
          },
          error: () => {
            this.modalService.alertDanger(
              'Erro ao realizar agendamento!',
              'Tente novamente mais tarde.'
            );
          },
          complete: () => {
            this.changed = false;
          }
        });
      }
    }
  }

  private createObject(): Appointment {
    const { date, timeslot, ...appointment } = this.form.value;
    const dateStr = date.toISOString().slice(0, 10);
    const times: string[] = timeslot.split('-');
    appointment.scheduledDate = dateStr;
    appointment.startTime = times[0];
    appointment.endTime = times[1];
    return appointment;
  }

  onCancel(): void {
    if (this.timestamp) {
      this.router.navigate(['agendamentos']);
    } else {
      this.router.navigate(['agendamentos'], { queryParams: { pagina: 1 } });
    }
  }
}
