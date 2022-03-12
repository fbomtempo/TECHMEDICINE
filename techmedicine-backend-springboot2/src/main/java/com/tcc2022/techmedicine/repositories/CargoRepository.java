package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
	
	List<Cargo> findAllByOrderByIdAsc();
	List<Cargo> findAllByOrderByDescricaoAsc();
}
