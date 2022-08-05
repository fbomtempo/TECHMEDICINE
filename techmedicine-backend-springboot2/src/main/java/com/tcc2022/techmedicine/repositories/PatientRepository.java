package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
	
	List<Patient> findAllByOrderByIdDesc();
	List<Patient> findAllByOrderByNameAscSurnameAsc();
}
