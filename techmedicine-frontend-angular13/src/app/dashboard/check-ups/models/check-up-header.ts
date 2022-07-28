import { Appointment } from 'src/app/dashboard/appointments/models/appointment';
import { Medic } from 'src/app/dashboard/medics/models/medic';
import { Patient } from 'src/app/dashboard/patients/models/patient';

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
