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
    this.patient = this.route.snapshot.data['patient'];
    this.formatData();
  }

  private formatData(): void {
    const date: Date = new Date(this.patient.birthDate);
    this.patient.birthDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.patient.cpf = this.maskService.applyMask('cpf', this.patient.cpf);
    this.patient.homePhone = this.maskService.applyMask('homePhone', this.patient.homePhone);
    this.patient.mobilePhone = this.maskService.applyMask('mobilePhone', this.patient.mobilePhone);
    this.patient.cep =this.maskService.applyMask('cep', this.patient.cep);
  }

  onBackToList(): void {
    this.location.back();
  }

}
