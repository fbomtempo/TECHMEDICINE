package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
	
	List<Paciente> findAllByOrderByIdAsc();
	
}
