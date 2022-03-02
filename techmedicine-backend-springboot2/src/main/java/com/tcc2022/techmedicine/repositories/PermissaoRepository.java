package com.tcc2022.techmedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Permissao;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
	
	Optional<Permissao> findByDescricao(String descricao);

}