import { Medico } from "../medicos/medico";
import { Paciente } from "../pacientes/paciente";

export interface Agendamento {

  id: number;
  paciente: Paciente;
  medico: Medico;
  dataAgendada: string;
  situacaoAgendamento: string;

}
