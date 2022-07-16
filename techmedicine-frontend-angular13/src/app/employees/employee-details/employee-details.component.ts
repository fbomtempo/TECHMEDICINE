import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/services/date.service';
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
    private dateService: DateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.employee = this.route.snapshot.data['employee'];
    this.maskService.formatData(this.employee);
    this.dateService.toPtBrDateString(this.employee);
  }
}
