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
import { Medic } from 'src/app/dashboard/medics/models/medic';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { ModalService } from 'src/app/shared/services/modal.service';

import { CheckUpHeader } from '../models/check-up-header';
import { CheckUpHeaderService } from '../services/check-up-header.service';

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
  isCollapsed: boolean = true;
  filterSwitches: any = {
    opened: true,
    finished: false,
    cancelled: false
  };
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  filterMedic: Medic;
  filter: string;

  constructor(
    private checkUpHeaderService: CheckUpHeaderService,
    private modalService: ModalService,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    private router: Router
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
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  situationLabelBackground(checkUpHeaderSituation: string): any {
    return {
      'check-up-header-label-open': checkUpHeaderSituation === 'ABERTO',
      'check-up-header-label-cancelled': checkUpHeaderSituation === 'CANCELADO',
      'check-up-header-label-finished': checkUpHeaderSituation === 'FINALIZADO'
    };
  }

  private fetchData(): void {
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

  onRefresh(): void | Observable<never> {
    this.checkUpHeaders$ = this.checkUpHeaderService.findAllFormatted().pipe(
      catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  onFilterInput(): void {
    if (this.currentPage !== 1) {
      this.toFirstPage();
    }
    if (this.filter == '') {
      this.toFirstPage();
    }
  }

  clearFilter(): void {
    this.filter = '';
    this.toFirstPage();
  }

  setFilterMedic(medic: Medic) {
    this.filterMedic = medic;
  }

  showData(checkUpHeaders: CheckUpHeader[]): CheckUpHeader[] {
    if (!this.filterSwitches.opened) {
      checkUpHeaders = checkUpHeaders.filter(
        (checkUpHeader: CheckUpHeader) =>
          checkUpHeader.checkUpHeaderSituation !== 'ABERTO'
      );
    }
    if (!this.filterSwitches.finished) {
      checkUpHeaders = checkUpHeaders.filter(
        (checkUpHeader: CheckUpHeader) =>
          checkUpHeader.checkUpHeaderSituation !== 'FINALIZADO'
      );
    }
    if (!this.filterSwitches.cancelled) {
      checkUpHeaders = checkUpHeaders.filter(
        (checkUpHeader: CheckUpHeader) =>
          checkUpHeader.checkUpHeaderSituation !== 'CANCELADO'
      );
    }
    if (this.filterMedic) {
      checkUpHeaders = checkUpHeaders.filter(
        (checkUpHeader: CheckUpHeader) =>
          checkUpHeader.medic.id === this.filterMedic.id
      );
    }
    if (this.filter) {
      checkUpHeaders = checkUpHeaders.filter((checkUpHeader: CheckUpHeader) => {
        if (
          `${checkUpHeader.patient.name} ${checkUpHeader.patient.surname}`
            .toLowerCase()
            .indexOf(this.filter.toLowerCase()) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    return checkUpHeaders;
  }

  onDelete(checkUpHeader: CheckUpHeader): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja cancelar esse cabeçalho de atendimento?'
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
            'Erro ao cancelar cabeçalho de atendimento!',
            'Tente novamente mais tarde.'
          )
      });
  }

  private toFirstPage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: 1
      },
      queryParamsHandling: 'merge'
    });
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

  onHome(): void {
    this.router.navigate(['/home']);
  }
}
