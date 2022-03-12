import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, Observable, of, Subject, Subscription, switchMap, take } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Cargo } from '../cargo';
import { CargosService } from '../cargos.service';

@Component({
  selector: 'app-cargos-lista',
  templateUrl: './cargos-lista.component.html',
  styleUrls: ['./cargos-lista.component.css']
})
export class CargosListaComponent implements OnInit, OnDestroy {

  cargos$: Observable<Cargo[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;

  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;

  filter: string;

  constructor(
    private cargosService: CargosService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.setPaginationSize();
    this.itemsPerPage = 10;
    this.subscription = this.route.queryParams.subscribe(queryParams => {
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
    this.cargos$ = this.cargosService.findAll()
      .pipe(catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  onDelete(cargo: Cargo): void {
    this.modalService.showConfirmModal('Confirmação', 'Tem certeza que deseja remover esse cargo?')
      .pipe(
        take(1),
        switchMap(result => result ? this.cargosService.delete(cargo.id) : of())
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () => this.modalService.alertDanger('Erro ao remover cargo!', 'Tente novamente mais tarde.')
      });
  }

  onShowData(cargos: Cargo[]): Cargo[] {
    if (!this.filter || this.filter == '') {
      return cargos;
    }
    return cargos.filter(v => {
      if (v.descricao.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
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

  onBack() {
    this.location.back();
  }

}
