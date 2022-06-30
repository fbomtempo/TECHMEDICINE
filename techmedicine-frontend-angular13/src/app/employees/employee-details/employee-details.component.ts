import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaskService } from 'src/app/shared/services/mask.service';

import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;

  constructor(
    private maskService: MaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.employee = this.maskService.formatData(
      this.route.snapshot.data['employee'],
      ['cpf', 'homePhone', 'mobilePhone', 'cep']
    );
  }

  onBackToList(): void {
    this.location.back();
  }
}
