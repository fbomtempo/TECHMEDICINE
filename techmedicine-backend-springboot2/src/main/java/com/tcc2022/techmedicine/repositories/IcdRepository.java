package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Icd;

public interface IcdRepository extends JpaRepository<Icd, Long> {
	
	List<Icd> findAllByOrderByIdDesc();
	List<Icd> findAllByOrderByDescriptionAsc();
	
}
