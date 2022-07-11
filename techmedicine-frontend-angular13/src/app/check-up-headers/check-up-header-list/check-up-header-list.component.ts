import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {
  catchError,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take
} from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

import { CheckUpHeader } from '../model/check-up-header';
import { CheckUpHeaderService } from '../service/check-up-header.service';

@Component({
  selector: 'app-check-up-header-list',
  templateUrl: './check-up-header-list.component.html',
  styleUrls: ['./check-up-header-list.component.css']
})
export class CheckUpHeaderHeaderListComponent implements OnInit, OnDestroy {
  checkUpHeaders$: Observable<CheckUpHeader[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;
  filter: string;
  isChecked: boolean = false;

  constructor(
    private checkUpHeaderService: CheckUpHeaderService,
    private modalService: ModalService,
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

  situationLabelBackground(checkUpHeaderSituation: string): any {
    return {
      'check-up-header-label-open': checkUpHeaderSituation === 'ABERTO',
      'check-up-header-label-cancelled': checkUpHeaderSituation === 'CANCELADO'
    };
  }

  onRefresh(): void | Observable<never> {
    this.checkUpHeaders$ = this.checkUpHeaderService.findAllFormatted().pipe(
      catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  showData(checkUpHeaders: CheckUpHeader[]): CheckUpHeader[] {
    switch (this.isChecked) {
      case true:
        checkUpHeaders = this.filter
          ? checkUpHeaders.filter((checkUpHeader: CheckUpHeader) => {
              if (
                `${checkUpHeader.patient.name} ${checkUpHeader.patient.surname}`
                  .toLowerCase()
                  .indexOf(this.filter.toLowerCase()) >= 0
              ) {
                return true;
              } else {
                return false;
              }
            })
          : checkUpHeaders;
        break;
      case false:
        checkUpHeaders = this.filter
          ? checkUpHeaders.filter((checkUpHeader: CheckUpHeader) => {
              if (
                `${checkUpHeader.patient.name} ${checkUpHeader.patient.surname}`
                  .toLowerCase()
                  .indexOf(this.filter.toLowerCase()) >= 0 &&
                checkUpHeader.attendancetSituation !== 'CANCELADO'
              ) {
                return true;
              } else {
                return false;
              }
            })
          : checkUpHeaders.filter((checkUpHeader: CheckUpHeader) => {
              if (checkUpHeader.attendancetSituation !== 'CANCELADO') {
                return true;
              } else {
                return false;
              }
            });
        break;
      default:
        checkUpHeaders = checkUpHeaders.filter(
          (event: any) =>
            event.extendedProps.checkUpHeader.checkUpHeaderSituation !==
            'CANCELADO'
        );
        break;
    }
    return checkUpHeaders;
  }

  onDelete(checkUpHeader: CheckUpHeader): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja cancelar esse atendimento?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult
            ? this.checkUpHeaderService.delete(checkUpHeader.id)
            : of()
        )
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao cancelar atendimento!',
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
