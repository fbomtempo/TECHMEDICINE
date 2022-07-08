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

import { Appointment } from '../../model/appointment';
import { AppointmentService } from '../../service/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  appointments$: Observable<Appointment[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;
  filter: string;
  isChecked: boolean = false;

  constructor(
    private appointmentService: AppointmentService,
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

  situationLabelBackground(appointmentSituation: string): any {
    return {
      'appointment-label-scheduled': appointmentSituation === 'AGENDADO',
      'appointment-label-cancelled': appointmentSituation === 'CANCELADO'
    };
  }

  onRefresh(): void | Observable<never> {
    this.appointments$ = this.appointmentService.findAllFormatted().pipe(
      catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  showData(appointments: Appointment[]): Appointment[] {
    switch (this.isChecked) {
      case true:
        appointments = this.filter
          ? appointments.filter((appointment: Appointment) => {
              if (
                `${appointment.patient.name} ${appointment.patient.surname}`
                  .toLowerCase()
                  .indexOf(this.filter.toLowerCase()) >= 0
              ) {
                return true;
              } else {
                return false;
              }
            })
          : appointments;
        break;
      case false:
        appointments = this.filter
          ? appointments.filter((appointment: Appointment) => {
              if (
                `${appointment.patient.name} ${appointment.patient.surname}`
                  .toLowerCase()
                  .indexOf(this.filter.toLowerCase()) >= 0 &&
                appointment.appointmentSituation !== 'CANCELADO'
              ) {
                return true;
              } else {
                return false;
              }
            })
          : appointments.filter((appointment: Appointment) => {
              if (appointment.appointmentSituation !== 'CANCELADO') {
                return true;
              } else {
                return false;
              }
            });
        break;
      default:
        appointments = appointments.filter(
          (event: any) =>
            event.extendedProps.appointment.appointmentSituation !== 'CANCELADO'
        );
        break;
    }
    return appointments;
  }

  onDelete(appointment: Appointment): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja remover esse funcionário?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult ? this.appointmentService.delete(appointment.id) : of()
        )
      )
      .subscribe({
        next: () => setTimeout(() => this.onRefresh(), 100),
        error: () =>
          this.modalService.alertDanger(
            'Erro ao remover agendamento!',
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
