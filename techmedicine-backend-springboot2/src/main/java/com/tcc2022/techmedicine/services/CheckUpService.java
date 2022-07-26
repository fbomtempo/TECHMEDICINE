package com.tcc2022.techmedicine.services;

import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.CheckUp;
import com.tcc2022.techmedicine.entities.CheckUpHeader;
import com.tcc2022.techmedicine.entities.Patient;
import com.tcc2022.techmedicine.entities.enums.CheckUpHeaderSituation;
import com.tcc2022.techmedicine.entities.enums.CheckUpSituation;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.CheckUpHeaderRepository;
import com.tcc2022.techmedicine.repositories.CheckUpRepository;
import com.tcc2022.techmedicine.repositories.PatientRepository;

@Service
public class CheckUpService {

	@Autowired
	private CheckUpRepository checkUpRepository;
	
	@Autowired
	private CheckUpHeaderRepository checkUpHeaderRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
	public List<CheckUp> findAll() {
		return checkUpRepository.findAll();
	}
	
	public CheckUp findById(Long id) {
		try {
			return checkUpRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Atendimento de id " + id + " não existe");
		}
	}
	
	public CheckUp insert(CheckUp obj) {
		try {
			CheckUp checkUp = checkUpRepository.findByCheckUpHeader(obj.getCheckUpHeader());
			if (checkUp != null) {
				if (checkUp.getCheckUpHeader().getCheckUpHeaderSituation() != CheckUpHeaderSituation.CANCELADO) {
					throw new DatabaseException("Cabeçalho de atendimento informado já possui um atendimento cadastrado");
				}
			}
			obj.setCheckUpSituation(CheckUpSituation.FINALIZADO);
			CheckUpHeader checkUpHeader = obj.getCheckUpHeader();
			checkUpHeader.setCheckUpHeaderSituation(CheckUpHeaderSituation.FINALIZADO);
			checkUpHeader.setEndTime(LocalTime.now());
			checkUpHeaderRepository.save(checkUpHeader);
			return checkUpRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			CheckUp checkUp = checkUpRepository.findById(id).get();
			if (checkUp.getCheckUpSituation() == CheckUpSituation.CANCELADO) {
				throw new DatabaseException("Atendimento já está cancelado");
			}
			checkUp.setCheckUpSituation(CheckUpSituation.CANCELADO);
			checkUpRepository.save(checkUp);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Atendimento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public CheckUp update(Long id, CheckUp obj) {
		try {
			CheckUp checkUp = checkUpRepository.findById(id).get();
			if (checkUp.getCheckUpSituation() == CheckUpSituation.CANCELADO) {
				throw new DatabaseException("Não é possivel alterar um atendimento cancelado");
			}
			updateData(checkUp, obj);
			return checkUpRepository.save(checkUp);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Atendimento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(CheckUp checkUp, CheckUp obj) {
		checkUp.setCheckUpHeader(obj.getCheckUpHeader());
		checkUp.setComplaint(obj.getComplaint());
		checkUp.setDiseaseHistory(obj.getDiseaseHistory());
		checkUp.setFamilyHistory(obj.getFamilyHistory());
		checkUp.setPatientHistory(obj.getPatientHistory());
		checkUp.setDisease(obj.getDisease());
		checkUp.setConduct(obj.getConduct());
		checkUp.setPrescription(obj.getPrescription());
		checkUp.setExams(obj.getExams());
	}
	
	public List<CheckUp> findAllByPatient(Long id) {
		try {
			Patient patient = patientRepository.findById(id).get();
			return checkUpRepository.findAllByPatient(patient);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Paciente de id " + id + " não existe");	
		}
	}
}
