package com.tcc2022.techmedicine.services;

import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.CheckUpHeader;
import com.tcc2022.techmedicine.entities.enums.AppointmentSituation;
import com.tcc2022.techmedicine.entities.enums.CheckUpSituation;
import com.tcc2022.techmedicine.exceptions.exception.DatabaseException;
import com.tcc2022.techmedicine.exceptions.exception.NotFoundException;
import com.tcc2022.techmedicine.repositories.AppointmentRepository;
import com.tcc2022.techmedicine.repositories.CheckUpHeaderRepository;

@Service
public class CheckUpHeaderService {

	@Autowired
	private CheckUpHeaderRepository checkUpHeaderRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	public List<CheckUpHeader> findAll() {
		return checkUpHeaderRepository.findAll();
	}
	
	public CheckUpHeader findById(Long id) {
		try {
			return checkUpHeaderRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Cabeçalho de atendimento de id " + id + " não existe");
		}
	}
	
	public CheckUpHeader insert(CheckUpHeader obj) {
		try {
			CheckUpHeader checkUpHeader = checkUpHeaderRepository.findByAppointment(obj.getAppointment());
			if (checkUpHeader != null) {
				throw new DatabaseException("Agendamento informado já possui um atendimento cadastrado");
			}
			Appointment appointment = obj.getAppointment();
			if (appointment != null) {
				appointment.setAppointmentSituation(AppointmentSituation.ATENDIDO);				
			}
			obj.setCheckUpSituation(CheckUpSituation.ABERTO);
			obj.setStartTime(LocalTime.now());
			appointmentRepository.save(appointment);
			return checkUpHeaderRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			CheckUpHeader checkUpHeader = findById(id);
			Appointment appointment = checkUpHeader.getAppointment();
			checkUpHeader.setCheckUpSituation(CheckUpSituation.CANCELADO);
			appointment.setAppointmentSituation(AppointmentSituation.AGENDADO);
			checkUpHeaderRepository.save(checkUpHeader);
			appointmentRepository.save(appointment);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Cabeçalho de atendimento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public CheckUpHeader update(Long id, CheckUpHeader obj) {
		try {
			CheckUpHeader checkUpHeader = checkUpHeaderRepository.findById(id).get();
			if (checkUpHeader.getCheckUpSituation() == CheckUpSituation.CANCELADO) {
				throw new DatabaseException("Não é possivel alterar um agendamento cancelado");
			}
			updateData(checkUpHeader, obj);
			return checkUpHeaderRepository.save(checkUpHeader);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Cabeçalho de atendimento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(CheckUpHeader checkUpHeader, CheckUpHeader obj) {
		checkUpHeader.setPatient(obj.getPatient());
		checkUpHeader.setMedic(obj.getMedic());
		checkUpHeader.setDate(obj.getDate());
		checkUpHeader.setStartTime(obj.getStartTime());
		checkUpHeader.setEndTime(obj.getEndTime());
	}
}
