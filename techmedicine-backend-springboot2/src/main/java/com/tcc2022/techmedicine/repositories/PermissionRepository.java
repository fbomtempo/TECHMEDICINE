package com.tcc2022.techmedicine.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
	
	Optional<Permission> findByDescription(String description);
	List<Permission> findAllByOrderByDescriptionAsc();
}