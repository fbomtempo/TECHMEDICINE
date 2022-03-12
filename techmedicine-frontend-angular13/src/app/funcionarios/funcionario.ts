import { Cargo } from "../cargos/cargo";

export interface Funcionario {

  id: number;
  nome: string;
  sobrenome: string;
  nascimento: string;
  sexo: string;
  cargo: Cargo;
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
