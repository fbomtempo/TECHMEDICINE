package com.tcc2022.techmedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.CheckUpHeader;

public interface CheckUpHeaderRepository extends JpaRepository<CheckUpHeader, Long> {
	
	CheckUpHeader findByAppointment(Appointment appointment);
}
