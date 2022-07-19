import { Appointment } from 'src/app/appointments/model/appointment';
import { Medic } from 'src/app/medics/model/medic';
import { Patient } from 'src/app/patients/model/patient';

export interface CheckUpHeader {
  id: number;
  appointment: Appointment;
  patient: Patient;
  medic: Medic;
  date: string;
  startTime: string;
  endTime: string;
  checkUpHeaderSituation: string;
}
