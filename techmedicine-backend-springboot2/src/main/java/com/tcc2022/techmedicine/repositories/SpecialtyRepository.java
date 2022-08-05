package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Specialty;

public interface SpecialtyRepository extends JpaRepository<Specialty, Long> {
	
	List<Specialty> findAllByOrderByIdDesc();
	List<Specialty> findAllByOrderByDescriptionAsc();
}
