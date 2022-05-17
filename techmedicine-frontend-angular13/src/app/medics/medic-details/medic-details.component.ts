import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaskService } from 'src/app/shared/services/mask.service';
import { Medic } from '../model/medic';

@Component({
  selector: 'app-medic-details',
  templateUrl: './medic-details.component.html',
  styleUrls: ['./medic-details.component.css']
})
export class MedicDetailsComponent implements OnInit {

  medic: Medic;

  constructor(
    private maskService: MaskService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.medic = this.route.snapshot.data['medic'];
    this.formatData();
  }

  private formatData(): void {
    let date: Date = new Date(this.medic.birthDate);
    this.medic.birthDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.medic.cpf = this.maskService.applyMask('cpf', this.medic.cpf);
    this.medic.homePhone = this.maskService.applyMask('homePhone', this.medic.homePhone);
    this.medic.mobilePhone = this.maskService.applyMask('mobilePhone', this.medic.mobilePhone);
    this.medic.cep =this.maskService.applyMask('cep', this.medic.cep);
  }

  onBackToList(): void {
    this.location.back();
  }
}
