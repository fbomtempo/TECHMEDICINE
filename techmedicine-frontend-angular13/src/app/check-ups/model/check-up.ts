import { CheckUpHeader } from './check-up-header';

export interface CheckUp {
  id: number;
  checkUpHeader: CheckUpHeader;
  complaint: string;
  medicines: string;
  exams: string;
}
