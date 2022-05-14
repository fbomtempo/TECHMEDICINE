import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {

  config = {
    keyboard: true
  };
  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.bsModalRef = this.bsModalService.show(this.modalTemplate, this.config);
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
