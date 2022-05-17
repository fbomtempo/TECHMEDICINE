package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Patient;
import com.tcc2022.techmedicine.repositories.PatientRepository;

@Service
public class PatientService {

	@Autowired
	private PatientRepository patientRepository;

	public List<Patient> findAll() {
		return patientRepository.findAllByOrderByIdDesc();
	}

	public Patient findById(long id) {
		Optional<Patient> obj = patientRepository.findById(id);
		return obj.get();
	}
	
	public Patient insert(Patient obj) {
		return patientRepository.save(obj);
	}

	public void delete(Long id) {
		patientRepository.deleteById(id);
	}

	public Patient update(Long id, Patient obj) {
		Patient patient = patientRepository.findById(id).get();
		updateData(patient, obj);
		return patientRepository.save(patient);
	}
	
	private void updateData(Patient patient, Patient obj) {
		patient.setName(obj.getName());
		patient.setSurname(obj.getSurname());
		patient.setBirthDate(obj.getBirthDate());
		patient.setGender(obj.getGender());
		patient.setRg(obj.getRg());
		patient.setCpf(obj.getCpf());
		patient.setHomePhone(obj.getHomePhone());
		patient.setMobilePhone(obj.getMobilePhone());
		patient.setEmail(obj.getEmail());
		patient.setCep(obj.getCep());
		patient.setCity(obj.getCity());
		patient.setState(obj.getState());
		patient.setAddress(obj.getAddress());
		patient.setNumber(obj.getNumber());
		patient.setDistrict(obj.getDistrict());
		patient.setComplement(obj.getComplement());
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
