package com.tcc2022.techmedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByUsername(String user);
	Boolean existsByUsername(String user);
	Boolean existsByEmail(String email);
	
}