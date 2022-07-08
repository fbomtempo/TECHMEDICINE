package com.tcc2022.techmedicine.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.Medic;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findAllByOrderByIdDesc();
	Appointment findByMedicAndScheduledTimestamp(Medic medic, LocalDateTime scheduledTimestamp);
}
