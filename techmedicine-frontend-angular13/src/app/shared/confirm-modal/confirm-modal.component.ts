import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;

  confirmResult: Subject<boolean> = new Subject();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onConfirm(): void {
    this.modalResult(true);
  }

  onCancel(): void {
    this.modalResult(false);
  }

  modalResult(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
