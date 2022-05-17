import { Specialty } from "../../specialties/model/specialty";

export interface Medic {

  id: number;
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  specialty: Specialty;
  crm: string;
  rg: string;
  cpf: string;
  homePhone: string;
  mobilePhone: string;
  email: string;
  cep: string;
  city: string;
  state: string;
  address: string;
  number: string;
  district: string;
  complement: string;

}
