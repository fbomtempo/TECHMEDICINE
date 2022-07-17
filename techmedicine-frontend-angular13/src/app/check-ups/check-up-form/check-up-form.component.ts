import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
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
            return checkUpHeader.checkUpSituation === 'ABERTO';
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
      id: [/*this.checkUp.id*/ null],
      checkUpHeader: [
        /*this.checkUp.checkUpHeader*/ null,
        [Validators.required]
      ],
      complaint: [
        /*this.checkUp.complaint*/ null,
        [Validators.required, Validators.maxLength(10)]
      ],
      medicines: [
        /*this.checkUp.medicines*/ null,
        [Validators.required, Validators.maxLength(300)]
      ],
      exams: [
        /*this.checkUp.exams*/ null,
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

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid && this.changed) {
      const checkUp: CheckUp = this.form.value;
      console.log(checkUp);
      /*if (this.form.value['id']) {
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
                this.router.navigate(['/atendimentos/iniciar'], {
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
                this.router.navigate(['/atendimentos/iniciar'], {
                  queryParams: { pagina: 1 }
                }),
              2000
            );
            this.submittedSucess = true;
          }
        });
      }*/
    }
  }

  /*private createObject(): CheckUpHeader {
    const checkUpHeader: CheckUpHeader = this.form.value;
    this.dateService.toISODateString(checkUpHeader);
    return checkUpHeader;
  }*/
}
