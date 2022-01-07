package com.tcc2022.techmedicine.config;

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
	
	@Autowired
	public PacienteRepository pacienteRepository;
	
	@Autowired
	public MedicoRepository medicoRepository;
	
	@Override
	public void run(String... args) throws Exception {
		
		Paciente p1 = new Paciente(null, "Felipe Bomtempo", "000.000.000-00", "(18) 00000-0000");
		Paciente p2 = new Paciente(null, "Andresa Felix", "000.000.000-01", "(18) 00000-0000");	
		List<Paciente> list = new ArrayList<>();
		list.add(p1);
		list.add(p2);
		pacienteRepository.saveAll(list);

		Medico m1 = new Medico(null, "Vine Delas", "000.000.000-02", "CRM");
		medicoRepository.save(m1);
	}	
}