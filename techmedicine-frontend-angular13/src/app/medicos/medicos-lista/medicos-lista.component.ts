import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, map, Observable, of, Subject, Subscription, switchMap, take } from 'rxjs';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Medico } from '../medico';
import { MedicosService } from '../medicos.service';

@Component({
  selector: 'app-medicos-lista',
  templateUrl: './medicos-lista.component.html',
  styleUrls: ['./medicos-lista.component.css']
})
export class MedicosListaComponent implements OnInit, OnDestroy {

  medicos$: Observable<Medico[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;

  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;

  filter: string;

  constructor(
    private medicosService: MedicosService,
    private modalService: ModalService,
    private maskService: MaskService,
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
      .pipe(
        map(medicos => {
          medicos.forEach(medico => {
            this.formatData(medico);
          })
          return medicos;
        }),
        catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  private formatData(medico: Medico): void {
    let date: Date = new Date(medico.nascimento);
    medico.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    medico.cpf = this.maskService.applyMask('cpf', medico.cpf);
    medico.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', medico.cpf);
    medico.telefoneCelular = this.maskService.applyMask('telefoneCelular', medico.telefoneCelular);
    medico.cep =this.maskService.applyMask('cep', medico.cep);
  }

  onDelete(medico: Medico): void {
    this.modalService.showConfirmModal('Confirmação', 'Tem certeza que deseja remover esse médico?')
      .pipe(
        take(1),
        switchMap(result => result ? this.medicosService.delete(medico.id) : of())
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () => this.modalService.alertDanger('Erro ao remover médico!', 'Tente novamente mais tarde.')
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
