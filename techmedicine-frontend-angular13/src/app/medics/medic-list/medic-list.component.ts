import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take
} from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Medic } from '../model/medic';
import { MedicService } from '../service/medic.service';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css']
})
export class MedicListComponent implements OnInit, OnDestroy {
  medics$: Observable<Medic[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;
  filter: string;

  constructor(
    private medicService: MedicService,
    private modalService: ModalService,
    private maskService: MaskService,
    private dateService: DateService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setPaginationSize();
    this.subscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.page = queryParams['pagina'];
        setTimeout(() => (this.currentPage = parseInt(this.page.toString())));
      }
    );
    this.onRefresh();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setPaginationSize(): void {
    if (window.innerWidth < 576) {
      this.paginationSize = 3;
    } else if (window.innerWidth < 992) {
      this.paginationSize = 7;
    } else {
      this.paginationSize = 10;
    }
    this.itemsPerPage = 10;
  }

  onRefresh(): void | Observable<never> {
    this.medics$ = this.medicService.findAll().pipe(
      map((medics: Medic[]) => {
        return medics.map((medic: Medic) => {
          this.maskService.formatData(medic, [
            'cpf',
            'homePhone',
            'mobilePhone',
            'cep'
          ]);
          this.dateService.toPtBrDateString(medic, ['birthDate']);
          return medic;
        });
      }),
      catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  showData(medics: Medic[]): Medic[] {
    if (!this.filter || this.filter == '') {
      return medics;
    }
    return medics.filter((medic: Medic) => {
      if (
        `${medic.name} ${medic.surname}`
          .toLowerCase()
          .indexOf(this.filter.toLowerCase()) >= 0
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  onDelete(medic: Medic): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja remover esse médico?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult ? this.medicService.delete(medic.id) : of()
        )
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao remover médico!',
            'Tente novamente mais tarde.'
          )
      });
  }

  pageChanged(event: PageChangedEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: event.page
      },
      queryParamsHandling: 'merge'
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  onBack(): void {
    this.location.back();
  }
}
