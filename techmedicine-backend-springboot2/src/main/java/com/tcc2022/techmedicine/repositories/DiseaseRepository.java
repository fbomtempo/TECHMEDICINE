package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Disease;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
	
	List<Disease> findAllByOrderByIdDesc();
	List<Disease> findAllByOrderByDescriptionAsc();
	
}
