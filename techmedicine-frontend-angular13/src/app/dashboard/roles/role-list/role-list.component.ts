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

import { Role } from '../models/role';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit, OnDestroy {
  roles$: Observable<Role[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;
  filter: string;

  constructor(
    private roleService: RoleService,
    private modalService: ModalService,
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRefresh(): void | Observable<never> {
    this.roles$ = this.roleService.findAll().pipe(
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

  showData(roles: Role[]): Role[] {
    if (!this.filter || this.filter == '') {
      return roles;
    }
    return roles.filter((role: Role) => {
      if (
        role.description.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  onDelete(Role: Role): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja remover esse cargo?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult ? this.roleService.delete(Role.id) : of()
        )
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao remover cargo!',
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
