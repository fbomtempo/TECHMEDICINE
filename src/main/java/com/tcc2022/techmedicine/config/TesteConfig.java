package com.tcc2022.techmedicine.config;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.tcc2022.techmedicine.entities.Medico;
import com.tcc2022.techmedicine.entities.Paciente;
import com.tcc2022.techmedicine.repositories.MedicoRepository;
import com.tcc2022.techmedicine.repositories.PacienteRepository;

@Configuration
@Profile("teste")
public class TesteConfig implements CommandLineRunner {
	
	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
	public PacienteRepository pacienteRepository;
	
	@Autowired
	public MedicoRepository medicoRepository;
	
	@Override
	public void run(String... args) throws Exception {
		
		
		Paciente p1 = new Paciente(null, "Felipe", "Bomtempo", sdf.parse("04/05/2001"), "Masculino", "00.000.000-0", "000.000.000-00", 
									"(18) 0000-0000", "(18) 00000-0000", "felipe@email.com", "00000-000", "Assis", "SP",
									"Rua A", "1020", "Parque XYZ", null);
		Paciente p2 = new Paciente(null, "Andresa", "Felix", sdf.parse("05/04/1976"), "Feminino", "00.000.000-0", "000.000.000-01", 
				null, "(18) 00000-0000", "felipe@email.com", "00000-000", "Assis", "SP",
				"Rua A", "1020", "Parque XYZ", null);
		List<Paciente> list = new ArrayList<>();
		list.add(p1);
		list.add(p2);
		pacienteRepository.saveAll(list);

		Medico m1 = new Medico(null, "Vine Delas", "000.000.000-02", "CRM");
		medicoRepository.save(m1);
	}	
}