import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { of, Subject, Subscription, switchMap, take } from 'rxjs';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  @Input() appointments: Appointment[];
  @Input() error: Subject<boolean> = new Subject();

  @Output() deleteEvent: EventEmitter<void> = new EventEmitter();

  subscription: Subscription;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;

  filter: string;

  constructor(
    private appointmentService: AppointmentService,
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
    this.appointments.forEach(appointment => {
      this.formatData(appointment);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.router.navigate([], {
      queryParams: {
        pagina: null
      }
    });
  }

  private formatData(appointment: Appointment): Appointment {
    const date: Date = new Date(appointment.scheduledTimestamp);
    const startTime: string = appointment.scheduledTimestamp.slice(11, 16);
    const endTime: string = appointment.endTimestamp.slice(11, 16);
    const timeslot: string = startTime + '-' + endTime;
    appointment.scheduledTimestamp = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    appointment.endTimestamp = timeslot;
    /*appointment.patient.cpf = this.maskService.applyMask('cpf', appointment.patient.cpf);
    appointment.patient.homePhone = this.maskService.applyMask('homePhone', appointment.patient.homePhone);
    appointment.patient.mobilePhone = this.maskService.applyMask('mobilePhone', appointment.patient.mobilePhone);
    appointment.patient.cep =this.maskService.applyMask('cep', appointment.patient.cep);*/
    return appointment;
  }

  onDelete(appointment: Appointment): void {
    this.modalService.showConfirmModal('Confirmação', 'Tem certeza que deseja remover esse agendamento?')
      .pipe(
        take(1),
        switchMap(result => result ? this.appointmentService.delete(appointment.id) : of())
      )
      .subscribe({
        next: () => setTimeout(() => this.deleteEvent.emit(), 100),
        error: () => this.modalService.alertDanger('Erro ao remover agendamento!', 'Tente novamente mais tarde.')
      });
  }

  onShowData(appointments: Appointment[]): Appointment[] {
    if (!this.filter || this.filter == '') {
      return appointments;
    }
    return appointments.filter(v => {
      if (v.scheduledTimestamp.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0) {
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

  onBack(): void {
    this.location.back();
  }

}
