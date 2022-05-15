import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, map, Observable, of, Subject, Subscription, switchMap, take } from 'rxjs';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Funcionario } from '../funcionario';
import { FuncionariosService } from '../funcionarios.service';

@Component({
  selector: 'app-funcionarios-lista',
  templateUrl: './funcionarios-lista.component.html',
  styleUrls: ['./funcionarios-lista.component.css']
})
export class FuncionariosListaComponent implements OnInit, OnDestroy {

  funcionarios$: Observable<Funcionario[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;

  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;

  filter: string;

  constructor(
    private funcionariosService: FuncionariosService,
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
    this.funcionarios$ = this.funcionariosService.findAll()
      .pipe(
        map(funcionarios => {
          return funcionarios.map(funcionario => {
            return this.formatData(funcionario);
          });
        }),
        catchError(() => {
          this.error.next(true);
          return of();
        })
    );
  }

  private formatData(funcionario: Funcionario): Funcionario {
    let date: Date = new Date(funcionario.nascimento);
    funcionario.nascimento = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    funcionario.cpf = this.maskService.applyMask('cpf', funcionario.cpf);
    funcionario.telefoneResidencial = this.maskService.applyMask('telefoneResidencial', funcionario.cpf);
    funcionario.telefoneCelular = this.maskService.applyMask('telefoneCelular', funcionario.telefoneCelular);
    funcionario.cep =this.maskService.applyMask('cep', funcionario.cep);
    return funcionario;
  }

  onDelete(funcionario: Funcionario): void {
    this.modalService.showConfirmModal('Confirmação', 'Tem certeza que deseja remover esse funcionário?')
      .pipe(
        take(1),
        switchMap(result => result ? this.funcionariosService.delete(funcionario.id) : of())
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () => this.modalService.alertDanger('Erro ao remover funcionário!', 'Tente novamente mais tarde.')
      });
  }

  onShowData(funcionarios: Funcionario[]): Funcionario[] {
    if (!this.filter || this.filter == '') {
      return funcionarios;
    }
    return funcionarios.filter(v => {
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
