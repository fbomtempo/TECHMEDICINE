import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CheckUp } from 'src/app/dashboard/check-ups/models/check-up';

@Component({
  selector: 'app-statement-print-model',
  templateUrl: './statement-print-model.component.html',
  styleUrls: ['./statement-print-model.component.css']
})
export class StatementPrintModelComponent implements OnInit {
  @Input() checkUp: CheckUp;
  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.checkUp) {
      for (const patient in changes) {
        const change = changes[patient];
        console.log(change.currentValue);
      }
    }
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
