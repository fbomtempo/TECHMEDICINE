import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CheckUp } from 'src/app/dashboard/check-ups/models/check-up';

@Component({
  selector: 'app-prescription-print-model',
  templateUrl: './prescription-print-model.component.html',
  styleUrls: ['./prescription-print-model.component.css']
})
export class PrescriptionPrintModelComponent implements OnInit {
  @Input() checkUp: CheckUp;
  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  ngOnInit(): void {}

  show(): void {
    this.bsModalRef = this.bsModalService.show(
      this.modalTemplate,
      Object.assign(
        {},
        {
          class: 'modal-fullscreen'
        }
      )
    );
  }

  close(): void {
    this.bsModalRef.hide();
  }

  printDocument(): void {
    window.print();
  }
}
