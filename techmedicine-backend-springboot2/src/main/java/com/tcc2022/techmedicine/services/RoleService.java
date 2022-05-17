package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Role;
import com.tcc2022.techmedicine.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;
	
	public List<Role> findAll() {
		return roleRepository.findAllByOrderByIdDesc();
	}
	
	public List<Role> findAllByOrderByDescriptionAsc() {
		return roleRepository.findAllByOrderByDescriptionAsc();
	}

	public Role findById(Long id) {
		Optional<Role> obj = roleRepository.findById(id);
		return obj.orElseThrow(() -> new NoSuchElementException("Objeto de 'id " + id + "' não encontrado."));
	}
	
	public Role insert(Role obj) {
		try {
			return roleRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		roleRepository.deleteById(id);
	}
	
	public Role update(Long id, Role obj) {
		Role role = roleRepository.findById(id).get();
		updateData(role, obj);
		return roleRepository.save(role);
	}
	
	private void updateData(Role role, Role obj) {
		role.setDescription(obj.getDescription());
	}
}
