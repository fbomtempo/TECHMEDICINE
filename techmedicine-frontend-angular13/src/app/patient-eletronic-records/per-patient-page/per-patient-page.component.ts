import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subject, switchMap, take } from 'rxjs';
import { CheckUp } from 'src/app/check-ups/model/check-up';
import { CheckUpService } from 'src/app/check-ups/service/check-up.service';
import { Medic } from 'src/app/medics/model/medic';
import { Patient } from 'src/app/patients/model/patient';
import { PatientService } from 'src/app/patients/service/patient.service';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-per-patient-page',
  templateUrl: './per-patient-page.component.html',
  styleUrls: ['./per-patient-page.component.css']
})
export class PerPatientPageComponent implements OnInit {
  patient: Patient;
  checkUps$: Observable<CheckUp[]>;
  error: Subject<boolean> = new Subject();
  isCollapsed: boolean = true;
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  filterMedic: Medic;

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

  setFilterMedic(medic: Medic) {
    this.filterMedic = medic;
  }

  showData(checkUps: CheckUp[]): CheckUp[] {
    if (this.filterMedic) {
      checkUps = checkUps.filter(
        (checkUp: CheckUp) =>
          checkUp.checkUpHeader.medic.id === this.filterMedic.id
      );
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

  reloadPage(): void {
    window.location.reload();
  }

  onBack(): void {
    this.router.navigate(['/pep'], { queryParams: { pagina: 1 } });
  }
}
