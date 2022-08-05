package com.tcc2022.techmedicine.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.enums.CheckUpSituation;
import com.tcc2022.techmedicine.repositories.AppointmentRepository;
import com.tcc2022.techmedicine.repositories.CheckUpRepository;
import com.tcc2022.techmedicine.repositories.PatientRepository;

@Service
public class ReportService {

	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private CheckUpRepository checkUpRepository;
	
	public Long countPatients() {
		return patientRepository.count();
	}
	
	public Long countAppointments() {
		return appointmentRepository.count();
	}
	
	public Long countCheckUps() {
		return checkUpRepository.countByCheckUpSituation(CheckUpSituation.FINALIZADO.getCode());
	}
}
