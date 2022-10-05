package com.tcc2022.techmedicine.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.Medic;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findAllByOrderByIdDesc();
	List<Appointment> findByMedicAndScheduledDateAndStartTime(Medic medic, LocalDate scheduledDate, LocalTime starTime);
}
