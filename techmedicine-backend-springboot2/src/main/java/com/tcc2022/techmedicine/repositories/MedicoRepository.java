package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Medico;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

	List<Medico> findAllByOrderByIdAsc();

}
