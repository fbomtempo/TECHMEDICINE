package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	
	List<Role> findAllByOrderByIdDesc();
	List<Role> findAllByOrderByDescriptionAsc();
}
