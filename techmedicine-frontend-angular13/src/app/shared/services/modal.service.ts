import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

enum AlertType {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private bsModalService: BsModalService) {}

  showAlertModal(
    title: string,
    description: string,
    alertType: AlertType,
    timeout?: number
  ): void {
    const bsModalRef: BsModalRef =
      this.bsModalService.show(AlertModalComponent);

    bsModalRef.content.title = title;
    bsModalRef.content.description = description;
    bsModalRef.content.type = alertType;

    if (timeout) {
      setTimeout(() => bsModalRef.hide(), timeout);
    }
  }

  alertDanger(title: string, description: string): void {
    this.showAlertModal(title, description, AlertType.DANGER);
  }

  alertSuccess(title: string, description: string): void {
    this.showAlertModal(title, description, AlertType.SUCCESS, 2000);
  }

  showConfirmModal(title: string, description: string): Subject<boolean> {
    const bsModalRef: BsModalRef = this.bsModalService.show(
      ConfirmModalComponent
    );

    (bsModalRef.content.title = title),
      (bsModalRef.content.description = description);

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
