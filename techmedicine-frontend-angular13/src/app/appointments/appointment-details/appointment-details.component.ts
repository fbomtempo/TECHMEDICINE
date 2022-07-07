import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateService } from 'src/app/shared/services/date.service';
import { MaskService } from 'src/app/shared/services/mask.service';

import { Appointment } from '../model/appointment';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  appointment: Appointment;

  constructor(
    private maskService: MaskService,
    private dateService: DateService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.appointment = this.route.snapshot.data['appointment'];
    this.formatData();
    this.formatTimestamps();
  }

  formatData(): void {
    const fields: string[] = ['cpf', 'homePhone', 'mobilePhone', 'cep'];
    this.maskService.formatData(this.appointment.patient, fields);
    this.maskService.formatData(this.appointment.medic, fields);
  }

  formatTimestamps(): void {
    const scheduledTime: string = this.appointment.scheduledTimestamp.slice(
      11,
      16
    );
    const endTime: string = this.appointment.endTimestamp.slice(11, 16);
    const date: string = this.dateService.toPtBrDateString(this.appointment, [
      'scheduledTimestamp'
    ])['scheduledTimestamp'];
    this.appointment.scheduledTimestamp = `${date} ${scheduledTime}`;
    this.appointment.endTimestamp = `${date} ${endTime}`;
  }

  onBackToList(): void {
    this.location.back();
  }
}
