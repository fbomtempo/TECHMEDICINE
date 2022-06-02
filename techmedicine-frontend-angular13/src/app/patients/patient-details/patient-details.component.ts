import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.patient = this.maskService.formatData(
      this.route.snapshot.data['patient'],
      ['birthDate', 'cpf', 'homePhone', 'mobilePhone', 'cep']
    );
  }

  onBackToList(): void {
    this.location.back();
  }

}
