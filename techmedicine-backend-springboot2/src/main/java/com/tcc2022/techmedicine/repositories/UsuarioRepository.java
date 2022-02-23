package com.tcc2022.techmedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	
	Optional<Usuario> findByUsuario(String usuario);
	Boolean existsByUsuario(String usuario);
	Boolean existsByEmail(String email);
	
}