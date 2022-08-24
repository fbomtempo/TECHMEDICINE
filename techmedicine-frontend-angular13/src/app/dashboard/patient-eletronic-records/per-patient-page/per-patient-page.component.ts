import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { catchError, Observable, of, Subject, switchMap, take } from 'rxjs';
import { CheckUp } from 'src/app/dashboard/check-ups/models/check-up';
import { CheckUpService } from 'src/app/dashboard/check-ups/services/check-up.service';
import { Medic } from 'src/app/dashboard/medics/models/medic';
import { Patient } from 'src/app/dashboard/patients/models/patient';
import { PatientService } from 'src/app/dashboard/patients/services/patient.service';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { ExamsPrintModelComponent } from '../per-checkup-print-models/exams-print-model/exams-print-model.component';
import { PrescriptionPrintModelComponent } from '../per-checkup-print-models/prescription-print-model/prescription-print-model/prescription-print-model.component';
import { StatementPrintModelComponent } from '../per-checkup-print-models/statement-print-model/statement-print-model.component';
import { PerPatientDetailsModalComponent } from '../per-patient-details-modal/per-patient-details-modal.component';

@Component({
  selector: 'app-per-patient-page',
  templateUrl: './per-patient-page.component.html',
  styleUrls: ['./per-patient-page.component.css']
})
export class PerPatientPageComponent implements OnInit {
  patient: Patient;
  checkUp: CheckUp;
  checkUps$: Observable<CheckUp[]>;
  error: Subject<boolean> = new Subject();
  isCollapsed: boolean = true;
  filterSwitches: any = {
    finished: true,
    cancelled: false
  };
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  dateRange: Date[];
  filterMedic: Medic;
  datepickerConfig: Partial<BsDaterangepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };
  @ViewChild('patientFullDetailsModal', { static: true })
  patientFullDetailsModal?: PerPatientDetailsModalComponent;
  @ViewChild('printStatement', { static: true })
  printStatement?: StatementPrintModelComponent;
  @ViewChild('printPrescription', { static: true })
  printPrescription?: PrescriptionPrintModelComponent;
  @ViewChild('printExams', { static: true })
  printExams?: ExamsPrintModelComponent;

  constructor(
    private patientService: PatientService,
    private checkUpService: CheckUpService,
    private dropdownService: DropdownService,
    private maskService: MaskService,
    private dateService: DateService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.patient = this.route.snapshot.data['patient'];
    this.maskService.formatData(this.patient);
    this.dateService.toPtBrDateString(this.patient);
    this.checkUps$ = this.checkUpService.findAllByPatient(this.patient.id).pipe(
      catchError(() => {
        this.error.next(true);
        return of();
      })
    );
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

  cancelledCheckUpSituationTextColor(checkUp: CheckUp): any {
    return {
      'text-danger': checkUp.checkUpSituation === 'CANCELADO'
    };
  }

  viewPatientFullDetails(): void {
    this.patientFullDetailsModal.show();
  }

  setFilterMedic(medic: Medic) {
    this.filterMedic = medic;
  }

  showData(checkUps: CheckUp[]): CheckUp[] {
    if (!this.filterSwitches.finished) {
      checkUps = checkUps.filter(
        (checkUp: CheckUp) => checkUp.checkUpSituation !== 'FINALIZADO'
      );
    }
    if (!this.filterSwitches.cancelled) {
      checkUps = checkUps.filter(
        (checkUp: CheckUp) => checkUp.checkUpSituation !== 'CANCELADO'
      );
    }
    if (this.filterMedic) {
      checkUps = checkUps.filter(
        (checkUp: CheckUp) =>
          checkUp.checkUpHeader.medic.id === this.filterMedic.id
      );
    }
    if (this.dateRange) {
      checkUps = checkUps.filter((checkUp: CheckUp) => {
        const dayMonthYear: string[] = checkUp.checkUpHeader.date.split('/');
        const startDate: Date = this.dateService.createDateObject(
          this.dateRange[0].toISOString().slice(0, 10),
          false
        );
        const endDate: Date = this.dateService.createDateObject(
          this.dateRange[1].toISOString().slice(0, 10),
          false
        );
        return (
          this.dateService
            .createDateObject(
              `${dayMonthYear[2]}-${dayMonthYear[1]}-${dayMonthYear[0]}`,
              false
            )
            .getTime() >= startDate.getTime() &&
          this.dateService
            .createDateObject(
              `${dayMonthYear[2]}-${dayMonthYear[1]}-${dayMonthYear[0]}`,
              false
            )
            .getTime() <= endDate.getTime()
        );
      });
    }
    return checkUps;
  }

  getCheckUpDuration(startTime: string, endTime: string): string {
    const startMilliseconds: number = new Date(
      '2022-01-01 ' + startTime
    ).getTime();
    const endMilliseconds: number = new Date('2022-01-01 ' + endTime).getTime();
    return this.convertMsToTime(endMilliseconds - startMilliseconds);
  }

  private convertMsToTime(milliseconds): string {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(
      minutes
    )}:${this.padTo2Digits(seconds)}`;
  }

  private padTo2Digits(num): string {
    return num.toString().padStart(2, '0');
  }

  onDelete(patient: Patient): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja remover esse paciente?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult ? this.patientService.delete(patient.id) : of()
        )
      )
      .subscribe({
        next: () =>
          setTimeout(
            () =>
              this.router.navigate(['/pep'], { queryParams: { pagina: 1 } }),
            100
          ),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao remover paciente!',
            'Tente novamente mais tarde.'
          )
      });
  }

  printDocument(checkUp: CheckUp, document: string): void {
    this.checkUp = checkUp;
    if (document === 'statement') {
      this.printStatement.show();
    }
    if (document === 'prescription') {
      this.printPrescription.show();
    }
    if (document === 'exams') {
      this.printExams.show();
    }
  }

  onCheckUpCancel(id: number): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja cancelar esse atendimento?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult ? this.checkUpService.delete(id) : of()
        )
      )
      .subscribe({
        next: () => setTimeout(() => this.fetchData(), 100),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao cancelar atendimento!',
            'Tente novamente mais tarde.'
          )
      });
  }

  reloadPage(): void {
    window.location.reload();
  }

  onBack(): void {
    this.router.navigate(['/pep'], { queryParams: { pagina: 1 } });
  }
}
