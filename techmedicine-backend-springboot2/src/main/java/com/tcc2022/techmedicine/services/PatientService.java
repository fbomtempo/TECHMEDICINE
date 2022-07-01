package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Patient;
import com.tcc2022.techmedicine.exceptions.exception.DatabaseException;
import com.tcc2022.techmedicine.exceptions.exception.NotFoundException;
import com.tcc2022.techmedicine.repositories.PatientRepository;

@Service
public class PatientService {

	@Autowired
	private PatientRepository patientRepository;

	public List<Patient> findAll() {
		return patientRepository.findAllByOrderByIdDesc();
	}

	public Patient findById(long id) {
		try {
			return patientRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Paciente de id " + id + " não existe");
		}
	}
	
	public Patient insert(Patient obj) {
		try {
			return patientRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}

	public void delete(Long id) {
		try {
			patientRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Paciente de id " + id + " não existe");
		}
	}

	public Patient update(Long id, Patient obj) {
		try {
			Patient patient = findById(id);
			updateData(patient, obj);
			return patientRepository.save(patient);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Paciente de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
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
}
