import { Role } from "../../roles/model/role";

export interface Employee {

  id: number;
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  role: Role;
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
