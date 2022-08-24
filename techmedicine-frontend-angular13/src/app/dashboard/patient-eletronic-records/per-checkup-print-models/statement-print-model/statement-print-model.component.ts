import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CheckUp } from 'src/app/dashboard/check-ups/models/check-up';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
  selector: 'app-statement-print-model',
  templateUrl: './statement-print-model.component.html',
  styleUrls: ['./statement-print-model.component.css']
})
export class StatementPrintModelComponent implements OnInit {
  @Input() checkUp: CheckUp;
  @Input() days: number;
  date: string;
  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    const isoDateStr: string = new Date().toISOString().slice(0, 10);
    const dateObj: Date = this.dateService.createDateObject(isoDateStr, false);
    this.date = dateObj.toLocaleDateString('pt-BR');
  }

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
