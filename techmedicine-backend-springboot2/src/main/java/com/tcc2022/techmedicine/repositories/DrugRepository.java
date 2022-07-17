package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Drug;

public interface DrugRepository extends JpaRepository<Drug, Long> {

	List<Drug> findAllByOrderByIdDesc();
}
