package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Role;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;
	
	public List<Role> findAll(Sort sort) {
		return roleRepository.findAll(sort);
	}
	
	public Page<Role> findAll(Pageable pageable, String filter) {
		if (filter.isBlank()) {
			return this.roleRepository.findAll(pageable);
		}
		return this.roleRepository.findRolesByFilter(pageable, filter);
	}

	public Role findById(Long id) {
		try {
			return roleRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Cargo de id " + id + " não existe");
		}
	}
	
	public Role insert(Role obj) {
		try {
			return roleRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		try {
			roleRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Cargo de id " + id + " não existe");
		}
	}
	
	public Role update(Long id, Role obj) {
		try {
			Role role = findById(id);
			updateData(role, obj);
			return roleRepository.save(role);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Cargo de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Role role, Role obj) {
		role.setDescription(obj.getDescription());
	}
	
	public List<Role> findAllByOrderByDescriptionAsc() {
		return roleRepository.findAllByOrderByDescriptionAsc();
	}
}
