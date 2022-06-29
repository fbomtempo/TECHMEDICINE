import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { of, switchMap, take } from 'rxjs';
import { MaskService } from 'src/app/shared/services/mask.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {
  @Input() appointment: Appointment;
  @Output() deletionEvent: EventEmitter<void> = new EventEmitter();
  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private appointmentService: AppointmentService,
    private modalService: ModalService,
    private maskService: MaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.appointment) {
      for (const appointment in changes) {
        const change = changes[appointment];
        this.formatData(change.currentValue);
      }
    }
  }

  show(): void {
    this.bsModalRef = this.bsModalService.show(
      this.modalTemplate,
      Object.assign(
        {},
        {
          class: 'modal-lg'
        }
      )
    );
  }

  close(): void {
    this.bsModalRef.hide();
  }

  onDelete(): void {
    this.modalService
      .showConfirmModal(
        'Confirmação',
        'Tem certeza que deseja remover esse agendamento?'
      )
      .pipe(
        take(1),
        switchMap((confirmResult: boolean) =>
          confirmResult
            ? this.appointmentService.delete(this.appointment.id)
            : of()
        )
      )
      .subscribe({
        next: () => {
          this.close();
          setTimeout(() => this.deletionEvent.emit(), 100);
        },
        error: () =>
          this.modalService.alertDanger(
            'Erro ao remover agendamento!',
            'Tente novamente mais tarde.'
          )
      });
  }

  onUpdate(): void {
    this.close();
    this.router.navigate(['editar/', this.appointment.id], {
      relativeTo: this.route
    });
  }

  private formatData(appointment: Appointment): void {
    const fields = ['birthDate', 'cpf', 'homePhone', 'mobilePhone', 'cep'];
    this.appointment.patient = this.maskService.formatData(
      appointment.patient,
      fields
    );
  }
}
