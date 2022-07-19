package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.enums.AppointmentSituation;
import com.tcc2022.techmedicine.exceptions.exception.DatabaseException;
import com.tcc2022.techmedicine.exceptions.exception.NotFoundException;
import com.tcc2022.techmedicine.repositories.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	public List<Appointment> findAll() {
		return appointmentRepository.findAllByOrderByIdDesc();
	}
	
	public Appointment findById(Long id) {
		try {
			return appointmentRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Agendamento de id " + id + " não existe");
		}
	}
	
	public Appointment insert(Appointment obj) {
		try {
			Appointment appointment = appointmentRepository.findByMedicAndScheduledDateAndStartTime(obj.getMedic(), obj.getScheduledDate(), obj.getStartTime());
			if (appointment != null) {
				if (appointment.getAppointmentSituation() != AppointmentSituation.CANCELADO) {
					throw new DatabaseException("Médico já possui consulta agendada para o horário informado");
				}
			}
			obj.setAppointmentSituation(AppointmentSituation.AGENDADO);
			return appointmentRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			Appointment appointment = findById(id);
			if (appointment.getAppointmentSituation() == AppointmentSituation.CANCELADO) {
				throw new DatabaseException("Agendamento já está cancelado");
			}
			if (appointment.getAppointmentSituation() == AppointmentSituation.ATENDIDO) {
				throw new DatabaseException("Não é possível cancelar um agendamento que já possui um atendimento associado");
			}
			appointment.setAppointmentSituation(AppointmentSituation.CANCELADO);
			appointmentRepository.save(appointment);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Agendamento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public Appointment update(Long id, Appointment obj) {
		try {
			Appointment appointment = findById(id);
			if (appointment.getAppointmentSituation() == AppointmentSituation.CANCELADO) {
				throw new DatabaseException("Não é possivel alterar um agendamento cancelado");
			}
			if (appointment.getAppointmentSituation() == AppointmentSituation.ATENDIDO) {
				throw new DatabaseException("Não é possivel alterar um agendamento que já possui um atendimento associado");
			}
			updateData(appointment, obj);
			return appointmentRepository.save(appointment);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Agendamento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Appointment appointment, Appointment obj) {
		appointment.setPatient(obj.getPatient());
		appointment.setMedic(obj.getMedic());
		appointment.setScheduledDate(obj.getScheduledDate());
		appointment.setStartTime(obj.getStartTime());
		appointment.setEndTime(obj.getEndTime());
	}
}
