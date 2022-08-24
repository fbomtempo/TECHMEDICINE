import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';

import { CheckUpHeader } from '../models/check-up-header';

@Component({
  selector: 'app-check-up-header-details',
  templateUrl: './check-up-header-details.component.html',
  styleUrls: ['./check-up-header-details.component.css']
})
export class CheckUpHeaderDetailsComponent implements OnInit {
  checkUpHeader: CheckUpHeader;

  constructor(
    private maskService: MaskService,
    private dateService: DateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  checkUpHeaderSituationTextColor(): any {
    return {
      color:
        this.checkUpHeader.checkUpHeaderSituation === 'ABERTO'
          ? '#3788d8'
          : this.checkUpHeader.checkUpHeaderSituation === 'CANCELADO'
          ? '#D90000'
          : '#00b28e'
    };
  }

  fetchData(): void {
    this.checkUpHeader = this.route.snapshot.data['checkUpHeader'];
    this.dateService.toPtBrDateString(this.checkUpHeader);
    this.maskService.formatData(this.checkUpHeader.patient);
    this.maskService.formatData(this.checkUpHeader.medic);
  }
}
