import { Especialidade } from "../especialidades/especialidade";

export interface Medico {

  id: number;
  nome: string;
  sobrenome: string;
  nascimento: Date;
  sexo: string;
  crm: string;
  especialidade: Especialidade;
  rg: string;
  cpf: string;
  telefoneResidencial: string;
  telefoneCelular: string;
  email: string;
  cep: string;
  cidade: string;
  estado: string;
  endereco: string;
  numero: string;
  bairro: string;
  complemento: string;

}
