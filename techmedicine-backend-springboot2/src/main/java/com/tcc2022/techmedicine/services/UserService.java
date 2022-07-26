package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tcc2022.techmedicine.entities.Usuario;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.UsuarioRepository;

@Service
public class UserService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	public Usuario findById(Long id) {
		try {	
			return usuarioRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Usuário de id " + id + " não existe");
		}
	}
	
    @Transactional
	public Usuario findByUsername(String username) {
		try {	
			Usuario usuario = usuarioRepository.findByUsername(username).get();
			Hibernate.initialize(usuario.getPermissions());
			return usuario;
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Usuário não existe");
		}
	}
	
	/*public Usuario insert(Usuarios obj) {
		try {
			return usuarioRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		try {
			usuarioRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Usuario update(Long id, Usuario obj) {
		try {
			Usuario usuario = usuarioRepository.findById(id).get();
			updateData(usuario, obj);
			return usuarioRepository.save(usuario);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Usuario usuario, Usuario obj) {
		usuario.setDescription(obj.getDescription());
	}*/
}
