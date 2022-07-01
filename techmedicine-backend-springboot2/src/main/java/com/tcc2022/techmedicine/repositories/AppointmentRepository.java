package com.tcc2022.techmedicine.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.entities.Medic;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	Appointment findByMedicAndScheduledTimestamp(Medic medic, LocalDateTime scheduledTimestamp);
}
