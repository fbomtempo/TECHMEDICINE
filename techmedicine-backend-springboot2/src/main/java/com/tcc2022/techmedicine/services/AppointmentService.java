package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.enums.AppointmentSituation;
import com.tcc2022.techmedicine.repositories.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	public List<Appointment> findAll() {
		return appointmentRepository.findAll();
	}
	
	public Appointment findById(Long id) {
		Optional<Appointment> obj = appointmentRepository.findById(id);
		return obj.get();
	}
	
	public Appointment insert(Appointment obj) {
		if (appointmentRepository.findByMedicAndScheduledTimestamp(obj.getMedic(), obj.getScheduledTimestamp()) != null) {
			throw new IllegalStateException("Médico já possui esse horário agendado!");
		}
		obj.setAppointmentSituation(AppointmentSituation.AGENDADO);
		return appointmentRepository.save(obj);
	}
	
	public void delete(Long id) {
		appointmentRepository.deleteById(id);
	}
	
	public Appointment update(Long id, Appointment obj) {
		Appointment appointment = appointmentRepository.findById(id).get();
		updateData(appointment, obj);
		return appointmentRepository.save(appointment);
	}
	
	private void updateData(Appointment appointment, Appointment obj) {
		appointment.setPatient(obj.getPatient());
		appointment.setMedic(obj.getMedic());
		appointment.setScheduledTimestamp(obj.getScheduledTimestamp());
		appointment.setEndTimestamp(obj.getEndTimestamp());
	}
}
