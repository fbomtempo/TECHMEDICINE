import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { map } from 'rxjs';
import { Appointment } from 'src/app/appointments/model/appointment';
import { AppointmentService } from 'src/app/appointments/service/appointment.service';
import { Medic } from 'src/app/medics/model/medic';
import { Patient } from 'src/app/patients/model/patient';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { CheckUpHeader } from '../model/check-up-header';
import { CheckUpHeaderService } from '../service/check-up-header.service';

@Component({
  selector: 'app-check-up-header-form',
  templateUrl: './check-up-header-form.component.html',
  styleUrls: ['./check-up-header-form.component.css']
})
export class CheckUpHeaderFormComponent extends FormService implements OnInit {
  checkUpHeader: CheckUpHeader;
  datepickerConfig: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };
  hasAppointment: boolean = true;
  appointments: Appointment[];
  appointmentsLoading: boolean = true;
  compareFnAppointment(c1: Appointment, c2: Appointment): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  patients: Patient[];
  patientsLoading: boolean = true;
  compareFnPatient(c1: Patient, c2: Patient): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  constructor(
    private formBuilder: FormBuilder,
    private checkUpHeaderService: CheckUpHeaderService,
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
    this.checkUpHeader = this.route.snapshot.data['checkUpHeader'];
    this.dropdownService
      .getAppointments()
      .pipe(
        map((appointments: Appointment[]) => {
          return appointments.filter((appointment: Appointment) => {
            return appointment.appointmentSituation === 'AGENDADO';
          });
        })
      )
      .subscribe({
        next: (appointments: Appointment[]) => {
          this.appointments = appointments.map((appointment: any) => {
            appointment.searchLabel = `${appointment.patient.name} ${appointment.patient.surname}`;
            return appointment;
          });
        },
        complete: () => {
          this.appointmentsLoading = false;
        }
      });
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
    if (this.route.snapshot.params['id']) {
      this.formType = 'Editar';
      var date: Date = this.dateService.createDateObject(
        this.checkUpHeader.date,
        false
      );
    } else {
      this.formType = 'Novo';
      var date: Date = new Date();
    }
    this.form = this.formBuilder.group({
      id: [this.checkUpHeader.id],
      appointment: [this.checkUpHeader.appointment],
      patient: [this.checkUpHeader.patient, [Validators.required]],
      medic: [this.checkUpHeader.medic, [Validators.required]],
      date: [date, [Validators.required]]
    });
    this.checkAppointmentQueryParam();
    this.subscribeToChanges();
  }

  private checkAppointmentQueryParam(): void {
    if (this.route.snapshot.queryParams['agendamento']) {
      this.appointmentService
        .findById(this.route.snapshot.queryParams['agendamento'])
        .subscribe({
          next: (appointment: Appointment) => {
            this.hasAppointment = true;
            this.onSelectChange(appointment);
          }
        });
    }
  }

  onSwitchChange(): void {
    if (!this.hasAppointment) {
      this.form.patchValue({
        appointment: null,
        patient: null,
        medic: null
      });
      this.form.get('appointment').markAsUntouched();
      this.form.get('patient').markAsUntouched();
      this.form.get('medic').markAsUntouched();
    }
  }

  onSelectChange(obj: any): void {
    if (obj) {
      this.form.patchValue({
        appointment: obj,
        patient: obj.patient,
        medic: obj.medic
      });
      this.form.get('appointment').markAsTouched();
      this.form.get('patient').markAsTouched();
      this.form.get('medic').markAsTouched();
    } else {
      this.form.patchValue({
        appointment: null,
        patient: null,
        medic: null
      });
      this.form.get('appointment').markAsUntouched();
      this.form.get('patient').markAsUntouched();
      this.form.get('medic').markAsUntouched();
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      const checkUpHeader: CheckUpHeader = this.createObject();
      if (this.form.value['id']) {
        this.checkUpHeaderService.update(checkUpHeader).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao atualizar cabeçalho de atendimento!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Cabeçalho de atendimento atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/atendimentos'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          }
        });
      } else {
        this.checkUpHeaderService.create(checkUpHeader).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao criar cabeçalho de atendimento!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Cabeçalho de atendimento criado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate(['/atendimentos'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          }
        });
      }
    }
  }

  private createObject(): CheckUpHeader {
    const checkUpHeader: CheckUpHeader = { ...this.form.value };
    this.dateService.toISODateString(checkUpHeader);
    return checkUpHeader;
  }
}
