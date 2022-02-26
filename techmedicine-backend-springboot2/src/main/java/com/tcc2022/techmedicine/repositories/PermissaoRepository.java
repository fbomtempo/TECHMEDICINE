package com.tcc2022.techmedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Permissao;
import com.tcc2022.techmedicine.entities.enums.PermissaoAcesso;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {
	
	Optional<Permissao> findByDescricao(PermissaoAcesso descricao);

}