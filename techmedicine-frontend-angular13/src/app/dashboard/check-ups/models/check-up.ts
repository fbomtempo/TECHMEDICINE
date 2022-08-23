import { CheckUpHeader } from './check-up-header';

export interface CheckUp {
  id: number;
  checkUpHeader: CheckUpHeader;
  complaint: string;
  diseaseHistory: string;
  familyHistory: string;
  patientHistory: string;
  disease: string;
  conduct: string;
  prescription: string;
  exams: string;
  checkUpSituation: string;
}
