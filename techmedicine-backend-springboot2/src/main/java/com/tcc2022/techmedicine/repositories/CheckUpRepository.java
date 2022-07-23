package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tcc2022.techmedicine.entities.CheckUp;
import com.tcc2022.techmedicine.entities.CheckUpHeader;
import com.tcc2022.techmedicine.entities.Patient;

public interface CheckUpRepository extends JpaRepository<CheckUp, Long> {
	
	CheckUp findByCheckUpHeader(CheckUpHeader checkUpHeader);
	
	@Query("SELECT c from CheckUp c "
			+ "WHERE c.checkUpHeader.patient = :patient "
			+ "ORDER BY c.checkUpHeader.date DESC")
	List<CheckUp> findAllByPatient(@Param("patient")Patient patient);
}
