import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';

import { Patient } from '../../patients/models/patient';

@Component({
  selector: 'app-per-patient-details-modal',
  templateUrl: './per-patient-details-modal.component.html',
  styleUrls: ['./per-patient-details-modal.component.css']
})
export class PerPatientDetailsModalComponent implements OnInit {
  @Input() patient: Patient;
  @ViewChild('template') modalTemplate;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService,
    private maskService: MaskService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.patient) {
      for (const patient in changes) {
        const change = changes[patient];
        this.formatData(change.currentValue);
      }
    }
  }

  private formatData(patient: Patient): void {
    this.patient = patient;
    this.maskService.formatData(this.patient);
    this.dateService.toPtBrDateString(this.patient);
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
}
