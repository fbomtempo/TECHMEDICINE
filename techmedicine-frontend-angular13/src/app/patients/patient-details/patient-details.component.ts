import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';

import { Patient } from '../model/patient';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient;

  constructor(
    private maskService: MaskService,
    private dateService: DateService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.patient = this.route.snapshot.data['patient'];
    this.maskService.formatData(this.patient);
    this.dateService.toPtBrDateString(this.patient);
  }

  onBackToList(): void {
    this.location.back();
  }
}
