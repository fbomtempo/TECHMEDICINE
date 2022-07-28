import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, Subject, switchMap, take } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  error: Subject<boolean> = new Subject();
  currentPage: number = 1;
  itemsPerPage: number;
  paginationSize: number;
  filter: string;
  show: any = {};
  @Output() editEvent: EventEmitter<number> = new EventEmitter();

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setPaginationSize();
    this.onRefresh();
  }

  onRefresh(): void | Observable<never> {
    this.users$ = this.userService.findAll().pipe(
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

  showData(users: User[]): User[] {
    if (!this.filter || this.filter == '') {
      return users;
    }
    return users.filter((user: User) => {
      if (user.username.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  showPermissions(username: string): void {
    if (this.show[username]) {
      this.show[username] = !this.show[username];
    } else {
      this.show[username] = true;
    }
  }

  onEdit(id: number): void {
    this.editEvent.emit(id);
  }

  onDelete(user: User): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja remover esse usuário?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult ? this.userService.delete(user.id) : of()
        )
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao remover usuário!',
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

  reloadPage(): void {
    window.location.reload();
  }

  onHome(): void {
    this.router.navigate(['/home']);
  }
}
