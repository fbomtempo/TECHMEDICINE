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
  ) { }

  ngOnInit(): void {
    this.employee = this.route.snapshot.data['employee'];
    this.formatData();
  }

  private formatData(): void {
    let date: Date = new Date(this.employee.birthDate);
    this.employee.birthDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    this.employee.cpf = this.maskService.applyMask('cpf', this.employee.cpf);
    this.employee.homePhone = this.maskService.applyMask('homePhone', this.employee.cpf);
    this.employee.mobilePhone = this.maskService.applyMask('mobilePhone', this.employee.mobilePhone);
    this.employee.cep =this.maskService.applyMask('cep', this.employee.cep);
  }

  onBackToList(): void {
    this.location.back();
  }

}
