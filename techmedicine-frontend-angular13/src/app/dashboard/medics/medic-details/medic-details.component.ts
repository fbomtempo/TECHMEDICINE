import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';

import { Medic } from '../models/medic';

@Component({
  selector: 'app-medic-details',
  templateUrl: './medic-details.component.html',
  styleUrls: ['./medic-details.component.css']
})
export class MedicDetailsComponent implements OnInit {
  medic: Medic;

  constructor(
    private maskService: MaskService,
    private dateService: DateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.medic = this.route.snapshot.data['medic'];
    this.maskService.formatData(this.medic);
    this.dateService.toPtBrDateString(this.medic);
  }
}
