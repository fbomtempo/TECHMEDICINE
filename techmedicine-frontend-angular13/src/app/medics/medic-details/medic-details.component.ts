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
    this.medic = this.maskService.formatData(
      this.route.snapshot.data['medic'],
      ['birthDate', 'cpf', 'homePhone', 'mobilePhone', 'cep']
    );
  }

  onBackToList(): void {
    this.location.back();
  }
}
