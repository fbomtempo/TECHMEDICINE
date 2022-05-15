import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medico } from 'src/app/medicos/medico';
import { Paciente } from 'src/app/pacientes/paciente';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {

  @Input() id: number;
  @Input() dataAgendada: string;
  @Input() dataTermino: string;
  @Input() Paciente: Paciente;
  @Input() Medico: Medico;
  @Input() situacaoAgendamento: string;

  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.bsModalRef = this.bsModalService.show(this.modalTemplate, Object.assign({}, { class: 'modal-lg' }));
  }

  close(): void {
    this.bsModalRef.hide();
  }

  update() {
    alert('update');
  }

  delete() {
    alert('delete');
  }

}
