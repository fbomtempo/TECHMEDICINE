import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medic } from 'src/app/medics/model/medic';
import { Patient } from 'src/app/patients/model/patient';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {

  @Input() id: number;
  @Input() dataAgendada: string;
  @Input() dataTermino: string;
  @Input() Patient: Patient;
  @Input() Medico: Medic;
  @Input() situacaoAgendamento: string;

  @ViewChild('template') modalTemplate;

  @Output() eventTest: EventEmitter<string> =  new EventEmitter();

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
    this.eventTest.emit('UPDATE');
  }

  delete() {
    this.eventTest.emit('DELETE');
  }

}
