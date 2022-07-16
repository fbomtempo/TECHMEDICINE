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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.appointment = this.route.snapshot.data['appointment'];
    this.dateService.toPtBrDateString(this.appointment);
    this.dateService.toPtBrDateString(this.appointment.patient);
    this.dateService.toPtBrDateString(this.appointment.medic);
    this.maskService.formatData(this.appointment.patient);
    this.maskService.formatData(this.appointment.medic);
  }

  appointmentSituationTextColor(): any {
    return {
      color:
        this.appointment.appointmentSituation === 'AGENDADO'
          ? '#3788d8'
          : this.appointment.appointmentSituation === 'CANCELADO'
          ? '#D90000'
          : '#00b28e'
    };
  }
}
