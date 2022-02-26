package com.tcc2022.techmedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Cargo;
import com.tcc2022.techmedicine.entities.enums.TipoCargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
	
	Optional<Cargo> findByDescricao(TipoCargo descricao);

}