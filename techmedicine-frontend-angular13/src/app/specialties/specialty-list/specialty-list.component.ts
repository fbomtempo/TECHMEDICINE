import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, Observable, of, Subject, Subscription, switchMap, take } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

import { Specialty } from '../model/specialty';
import { SpecialtyService } from '../service/specialty.service';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit, OnDestroy {

  specialties$: Observable<Specialty[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;

  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;

  filter: string;

  constructor(
    private specialtyService: SpecialtyService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.setPaginationSize();
    this.itemsPerPage = 10;
    this.subscription = this.route.queryParams.subscribe((queryParams: Params) => {
      this.page = queryParams['pagina'];
      this.filter = queryParams['descricao'];
      this.currentPage = parseInt(this.page.toString());
    });
    this.onRefresh();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRefresh(): void | Observable<never> {
    this.specialties$ = this.specialtyService.findAll()
      .pipe(catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  onDelete(especialidade: Specialty): void {
    this.modalService.showConfirmModal('Confirmação', 'Tem certeza que deseja remover essa especialidade?')
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) => confirmResult ? this.specialtyService.delete(especialidade.id) : of())
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () => this.modalService.alertDanger('Erro ao remover especialidade!', 'Tente novamente mais tarde.')
      });
  }

  onShowData(specialties: Specialty[]): Specialty[] {
    if (!this.filter || this.filter == '') {
      return specialties;
    }
    return specialties.filter((specialty: Specialty) => {
      if (specialty.description.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      } else {
        return false;
      }
    })
  }

  setFilter(filter: string): void {
    if (filter) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          descricao: filter.toLowerCase()
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  onClearFilter(filterInput: HTMLInputElement): void {
    filterInput.value = '';
    if (this.route.snapshot.queryParams['descricao']) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          descricao: null
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: event.page
      },
      queryParamsHandling: 'merge',
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  private setPaginationSize(): void {
    if (window.innerWidth < 576) {
      this.paginationSize = 3;
    } else if (window.innerWidth < 992){
      this.paginationSize = 7;
    } else {
      this.paginationSize = 10;
    }
  }

  onBack(): void {
    this.location.back();
  }
}
