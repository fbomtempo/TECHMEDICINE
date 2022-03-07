package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Paciente;
import com.tcc2022.techmedicine.repositories.PacienteRepository;

@Service
public class PacienteService {

	@Autowired
	private PacienteRepository pacienteRepository;

	public List<Paciente> findAll() {
		return pacienteRepository.findAllByOrderByIdAsc();
	}

	public Paciente findById(long id) {
		Optional<Paciente> obj = pacienteRepository.findById(id);
		return obj.get();
	}
	
	public Paciente insert(Paciente obj) {
		return pacienteRepository.save(obj);
	}

	public void delete(Long id) {
		pacienteRepository.deleteById(id);
	}

	public Paciente update(Long id, Paciente obj) {
		Paciente paciente = pacienteRepository.findById(id).get();
		updateData(paciente, obj);
		return pacienteRepository.save(paciente);
	}
	
	private void updateData(Paciente paciente, Paciente obj) {
		paciente.setNome(obj.getNome());
		paciente.setSobrenome(obj.getSobrenome());
		paciente.setNascimento(obj.getNascimento());
		paciente.setSexo(obj.getSexo());
		paciente.setRg(obj.getRg());
		paciente.setCpf(obj.getCpf());
		paciente.setTelefoneResidencial(obj.getTelefoneResidencial());
		paciente.setTelefoneCelular(obj.getTelefoneCelular());
		paciente.setEmail(obj.getEmail());
		paciente.setCep(obj.getCep());
		paciente.setCidade(obj.getCidade());
		paciente.setEstado(obj.getEstado());
		paciente.setEndereco(obj.getEndereco());
		paciente.setNumero(obj.getNumero());
		paciente.setBairro(obj.getBairro());
		paciente.setComplemento(obj.getComplemento());
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
