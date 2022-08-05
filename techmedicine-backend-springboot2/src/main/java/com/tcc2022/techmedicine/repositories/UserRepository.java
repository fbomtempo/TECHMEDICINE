package com.tcc2022.techmedicine.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findAllByOrderByIdDesc();
	Optional<User> findByUsername(String username);
}
