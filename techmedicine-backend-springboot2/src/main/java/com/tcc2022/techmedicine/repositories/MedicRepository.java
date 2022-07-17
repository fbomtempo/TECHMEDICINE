package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Medic;

public interface MedicRepository extends JpaRepository<Medic, Long> {

	List<Medic> findAllByOrderByIdDesc();
}
