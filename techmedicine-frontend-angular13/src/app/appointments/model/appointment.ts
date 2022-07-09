import { Medic } from '../../medics/model/medic';
import { Patient } from '../../patients/model/patient';

export interface Appointment {
  id: number;
  patient: Patient;
  medic: Medic;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  appointmentSituation: string;
}
