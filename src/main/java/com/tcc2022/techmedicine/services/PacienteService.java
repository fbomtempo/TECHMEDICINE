package com.tcc2022.techmedicine.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Paciente;
import com.tcc2022.techmedicine.repositories.PacienteRepository;

@Service
public class PacienteService {

	@Autowired
	private PacienteRepository pacienteRepository;

	public List<Paciente> findAll() {
		return pacienteRepository.findAll();
	}
	
	/*public List<Paciente> findAll() {
		try {
			return pacienteRepository.findAll();
		}
		catch (NoSuchElementException e) {
			throw new ResourceNotFoundException("Pacientes não encontrados");
		}
	}
	
	public Paciente findById(Long id) {
		try {
			Optional<Paciente> obj = pacienteRepository.findById(id);
			return obj.get();
		}
		catch (NoSuchElementException e) {
			throw new ResourceNotFoundException("Paciente de id '" + id + "' não encontrado");
		}
	}
	
	public Paciente insert(Paciente obj) {
		try {
			return pacienteRepository.save(obj);		
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Chave PRIMÁRIA ou ÚNICA violada");	
		}
	}*/
}
