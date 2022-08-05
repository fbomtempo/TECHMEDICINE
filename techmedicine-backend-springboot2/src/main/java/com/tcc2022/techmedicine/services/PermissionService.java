package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Permission;
import com.tcc2022.techmedicine.repositories.PermissionRepository;

@Service
public class PermissionService {

	@Autowired
	private PermissionRepository permissionRepository;
	
	public List<Permission> findAll() {
		return permissionRepository.findAll();
	}
	
	public Permission findById(Long id) {
		Optional<Permission> obj = permissionRepository.findById(id);
		return obj.get();
	}
	
	public Permission insert(Permission obj) {
		return permissionRepository.save(obj);
	}
	
	public void delete(Long id) {
		permissionRepository.deleteById(id);
	}
	
	public List<Permission> findAllByOrderByDescriptionAsc() {
		return permissionRepository.findAllByOrderByDescriptionAsc();
	}
}
