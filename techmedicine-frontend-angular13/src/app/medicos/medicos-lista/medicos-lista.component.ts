import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, Observable, of, Subject, Subscription, switchMap, take } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Medico } from '../medico';
import { MedicosService } from '../medicos.service';

@Component({
  selector: 'app-medicos-lista',
  templateUrl: './medicos-lista.component.html',
  styleUrls: ['./medicos-lista.component.css']
})
export class MedicosListaComponent implements OnInit {

  medicos$: Observable<Medico[]>;
  error$: Subject<boolean> = new Subject();
  subscription: Subscription;

  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;

  filter: string;

  constructor(
    private medicosService: MedicosService,
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
      this.filter = queryParams['nome'];
      this.currentPage = parseInt(this.page.toString());
    });
    this.onRefresh();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRefresh(): void | Observable<never> {
    this.medicos$ = this.medicosService.findAll()
      .pipe(catchError(() => {
        this.error$.next(true);
        return of();
      })
    );
  }

  onDelete(medico: Medico): void {
    this.modalService.showConfirmModal('Confirmação', 'Tem certeza que deseja remover essa paciente?')
      .pipe(
        take(1),
        switchMap(result => result ? this.medicosService.delete(medico.id) : of())
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () => this.modalService.alertDanger('Erro ao remover paciente!', 'Tente novamente mais tarde.')
      });
  }

  onShowData(medicos: Medico[]): Medico[] {
    if (!this.filter || this.filter == '') {
      return medicos;
    }
    return medicos.filter(v => {
      if (v.nome.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
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
          nome: filter.toLowerCase()
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  onClearFilter(filterInput: HTMLInputElement): void {
    filterInput.value = '';
    if (this.route.snapshot.queryParams['nome']) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          nome: null
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
