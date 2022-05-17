package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

	List<Appointment> findAllByOrderByIdDesc();

}
