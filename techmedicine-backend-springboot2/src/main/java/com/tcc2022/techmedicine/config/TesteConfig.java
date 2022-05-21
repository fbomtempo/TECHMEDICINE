package com.tcc2022.techmedicine.config;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.tcc2022.techmedicine.entities.Employee;
import com.tcc2022.techmedicine.entities.Medic;
import com.tcc2022.techmedicine.entities.Patient;
import com.tcc2022.techmedicine.entities.Role;
import com.tcc2022.techmedicine.entities.Specialty;
import com.tcc2022.techmedicine.repositories.AppointmentRepository;
import com.tcc2022.techmedicine.repositories.EmployeeRepository;
import com.tcc2022.techmedicine.repositories.MedicRepository;
import com.tcc2022.techmedicine.repositories.PatientRepository;
import com.tcc2022.techmedicine.repositories.RoleRepository;
import com.tcc2022.techmedicine.repositories.SpecialtyRepository;

//@Configuration
//@Profile("postgresql")
//public class TesteConfig implements CommandLineRunner {
//
//	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
//	SimpleDateFormat sdf2 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
//
//	@Autowired
//	private RoleRepository roleRepository;
//	
//	@Autowired
//	private SpecialtyRepository specialtyRepository;
//	
//	@Autowired
//	public PatientRepository patientRepository;
//
//	@Autowired
//	public MedicRepository medicRepository;
//	
//	@Autowired
//	public EmployeeRepository employeeRepository;
//
//	@Autowired
//	private AppointmentRepository appointmentRepository;
//
//	@Override 
//	public void run(String... args) throws Exception {
//		List<Role> roleList = new ArrayList<>();
//		List<Specialty> specialtyList = new ArrayList<>();
//		List<Patient> patientList = new ArrayList<>();
//		List<Medic> medicList = new ArrayList<>();
//		List<Employee> employeeList = new ArrayList<>();
//		for(int i = 0; i < 50; i++) {
//			String numberStr = Integer.toString(i + 1);
//			roleList.add(new Role(null, "Auto-Generated Role ".concat(numberStr)));
//			specialtyList.add(new Specialty(null, "Auto-Generated Specialty ".concat(numberStr)));
//		}
//		roleRepository.saveAll(roleList);
//		specialtyRepository.saveAll(specialtyList);
//	}
//	
//}
		
/*List<Especialidade> especialidades = new ArrayList<>(); Especialidade e1 =
new Especialidade(null, "Clinico Geral"); Especialidade e2 = new
Especialidade(null, "Cardiologista"); Especialidade e3 = new
Especialidade(null, "Dermatologista"); Especialidade e4 = new
Especialidade(null, "Urologista"); Especialidade e5 = new Especialidade(null,
"Oftalmologista"); especialidades.add(e1); especialidades.add(e2);
especialidades.add(e3); especialidades.add(e4); especialidades.add(e5);
especialidadeRepository.saveAll(especialidades);
	  
Especialidade e1 = new Especialidade(null, "Clinico Geral");
especialidadeRepository.save(e1);
	  
for (int i = 2; i <= 10; i++) { String desc = String.join("", "Teste",
Integer.toString(i)); especialidadeRepository.save(new Especialidade(null,
desc)); }
	  
Paciente p1 = new Paciente(null, "Felipe", "Bomtempo",
sdf.parse("04/05/2001"), "Masculino", "00.000.000-0", "000.000.000-00",
"(18) 0000-0000", "(18) 00000-0000", "felipe@email.com", "00000-000",
"Assis", "SP", "Rua A", "1020", "Parque XYZ", null); Paciente p2 = new
Paciente(null, "Andresa", "Felix", sdf.parse("05/04/1976"), "Feminino",
"00.000.000-0", "000.000.000-01", null, "(18) 00000-0000",
"felipe@email.com", "00000-000", "Assis", "SP", "Rua A", "1020",
"Parque XYZ", null); List<Paciente> list = new ArrayList<>(); list.add(p1);
list.add(p2); pacienteRepository.saveAll(list);
	  
Medico m1 = new Medico(null, "Andresa", "Felix", sdf.parse("05/04/1976"),
"Feminino", "00000000", e1, "00.000.000-0", "000.000.000-01", null,
"(18) 00000-0000", "felipe@email.com", "00000-000", "Assis", "SP", "Rua A",
"1020", "Parque XYZ", null); medicoRepository.save(m1);
	  
	  
Agendamento a1 = new Agendamento(null, p1, m1, sdf.parse("10/01/2022"),
sdf2.parse("15/01/2022 15:30"), SituacaoAgendamento.AGENDADO);
agendamentoRepository.save(a1);
	  
Atendimento atd1 = new Atendimento(null, null, p1, m1,
sdf2.parse("15/01/2022 15:30"), SituacaoAtendimento.ABERTO);
atendimentoRepository.save(atd1);
	  
Atendimento atd2 = new Atendimento(null, a1, p1, m1,
sdf2.parse("15/01/2022 15:30"), SituacaoAtendimento.ABERTO);
atendimentoRepository.save(atd2);*/
