package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.repositories.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository agendamentoRepository;
	
	public List<Appointment> findAll() {
		return agendamentoRepository.findAll();
	}
	
	public Appointment findById(Long id) {
		Optional<Appointment> obj = agendamentoRepository.findById(id);
		return obj.get();
	}
	
	public Appointment insert(Appointment obj) {
		return agendamentoRepository.save(obj);
	}
	
	public void delete(Long id) {
		agendamentoRepository.deleteById(id);
	}
	
	public Appointment update(Long id, Appointment obj) {
		Appointment appointment = agendamentoRepository.findById(id).get();
		updateData(appointment, obj);
		return agendamentoRepository.save(appointment);
	}
	
	private void updateData(Appointment appointment, Appointment obj) {
		appointment.setPatient(obj.getPatient());
		appointment.setMedic(obj.getMedic());
		appointment.setScheduledTimestamp(obj.getScheduledTimestamp());
		appointment.setEndTimestamp(obj.getEndTimestamp());
		appointment.setAppointmentSituation(obj.getAppointmentSituation());
	}
}
