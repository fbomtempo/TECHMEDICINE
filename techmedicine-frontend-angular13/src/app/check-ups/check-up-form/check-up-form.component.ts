import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { map } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { FormService } from 'src/app/shared/services/form-service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { CheckUp } from '../model/check-up';
import { CheckUpHeader } from '../model/check-up-header';
import { CheckUpHeaderService } from '../service/check-up-header.service';
import { CheckUpService } from '../service/check-up.service';

@Component({
  selector: 'app-check-up-form',
  templateUrl: './check-up-form.component.html',
  styleUrls: ['./check-up-form.component.css']
})
export class CheckUpFormComponent extends FormService implements OnInit {
  checkUp: CheckUp;
  datepickerConfig: Partial<BsDatepickerConfig> = {
    adaptivePosition: true,
    showClearButton: true,
    clearButtonLabel: 'Limpar',
    containerClass: 'theme-dark-blue'
  };
  checkUpHeaders: CheckUpHeader[];
  checkUpHeadersLoading: boolean = true;
  compareFnCheckUpHeaders(c1: CheckUpHeader, c2: CheckUpHeader): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor(
    private formBuilder: FormBuilder,
    private checkUpService: CheckUpService,
    private checkUpHeaderService: CheckUpHeaderService,
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
    this.checkUp = this.route.snapshot.data['checkUp'];
    this.dropdownService
      .getCheckUpHeaders()
      .pipe(
        map((checkUpHeaders: CheckUpHeader[]) => {
          return checkUpHeaders.filter((checkUpHeader: CheckUpHeader) => {
            return checkUpHeader.checkUpHeaderSituation === 'ABERTO';
          });
        })
      )
      .subscribe({
        next: (checkUpHeaders: CheckUpHeader[]) => {
          this.checkUpHeaders = checkUpHeaders.map((checkUpHeader: any) => {
            checkUpHeader.searchLabel = `${checkUpHeader.patient.name} ${checkUpHeader.patient.surname}`;
            return checkUpHeader;
          });
        },
        complete: () => {
          this.checkUpHeadersLoading = false;
        }
      });
  }

  private createForm(): void {
    this.formType = this.route.snapshot.params['id'] ? 'Editar' : 'Novo';
    this.form = this.formBuilder.group({
      id: [this.checkUp.id],
      checkUpHeader: [this.checkUp.checkUpHeader, [Validators.required]],
      complaint: [
        this.checkUp.complaint,
        [Validators.required, Validators.maxLength(10)]
      ],
      diseaseHistory: [
        this.checkUp.diseaseHistory,
        [Validators.required, Validators.maxLength(500)]
      ],
      familyHistory: [
        this.checkUp.familyHistory,
        [Validators.required, Validators.maxLength(500)]
      ],
      patientHistory: [
        this.checkUp.patientHistory,
        [Validators.required, Validators.maxLength(500)]
      ],
      disease: [
        this.checkUp.disease,
        [Validators.required, Validators.maxLength(50)]
      ],
      conduct: [
        this.checkUp.conduct,
        [Validators.required, Validators.maxLength(500)]
      ],
      prescription: [
        this.checkUp.prescription,
        [Validators.required, Validators.maxLength(300)]
      ],
      exams: [
        this.checkUp.exams,
        [Validators.required, Validators.maxLength(300)]
      ]
    });
    this.checkHeaderQueryParam();
    this.subscribeToChanges();
  }

  private checkHeaderQueryParam(): void {
    if (this.route.snapshot.queryParams['atendimento']) {
      this.checkUpHeaderService
        .findById(this.route.snapshot.queryParams['atendimento'])
        .subscribe({
          next: (checkUpHeader: CheckUpHeader) => {
            this.onSelectChange(checkUpHeader);
          }
        });
    }
  }

  onSelectChange(obj: any): void {
    if (obj) {
      this.form.patchValue({
        checkUpHeader: obj
      });
      this.form.get('checkUpHeader').markAsTouched();
    } else {
      this.form.patchValue({
        checkUpHeader: null
      });
      this.form.get('checkUpHeader').markAsUntouched();
    }
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      const checkUp: CheckUp = this.form.value;
      console.log(checkUp);
      if (this.form.value['id']) {
        this.checkUpService.update(checkUp).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao atualizar atendimento!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Atendimento atualizado com sucesso!',
              'Redirecionando a página...'
            );
            setTimeout(
              () =>
                this.router.navigate([
                  '/pep/paciente/',
                  this.form.get('checkUpHeader').value['patient']['id']
                ]),
              2000
            );
            this.submittedSucess = true;
          }
        });
      } else {
        this.checkUpService.create(checkUp).subscribe({
          error: () =>
            this.modalService.alertDanger(
              'Erro ao criar atendimento!',
              'Tente novamente mais tarde.'
            ),
          complete: () => {
            this.modalService.alertSuccess(
              'Atendimento criado com sucesso!',
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
}
