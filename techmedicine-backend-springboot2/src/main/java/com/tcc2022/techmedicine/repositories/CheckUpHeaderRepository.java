package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.CheckUpHeader;

public interface CheckUpHeaderRepository extends JpaRepository<CheckUpHeader, Long> {
	
	List<CheckUpHeader> findAllByOrderByIdDesc();
	CheckUpHeader findByAppointment(Appointment appointment);
}
