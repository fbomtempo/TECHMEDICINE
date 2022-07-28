import { Medic } from '../../medics/models/medic';
import { Patient } from '../../patients/models/patient';

export interface Appointment {
  id: number;
  patient: Patient;
  medic: Medic;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  appointmentSituation: string;
}
