package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tcc2022.techmedicine.entities.User;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public List<User> findAll() {
		return userRepository.findAllByOrderByIdDesc().stream().map(user -> {
			user.setPassword(null);
			return user;
		}).collect(Collectors.toList());
	}

	public User findById(Long id) {
		try {
			User user = userRepository.findById(id).get();
			user.setPassword(null);
			return user;
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Usuário de id " + id + " não existe");
		}
	}

	@Transactional
	public User findByUsername(String username) {
		try {
			User user = userRepository.findByUsername(username).get();
			Hibernate.initialize(user.getPermissions());
			return user;
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Usuário não existe");
		}
	}

	public User insert(User obj) {
		try {
			return userRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}

	public void delete(Long id) {
		try {
			userRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}

	public User update(Long id, User obj) {
		try {
			User user = userRepository.findById(id).get();
			updateData(user, obj);
			return userRepository.save(user);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}

	private void updateData(User user, User obj) {
		user.setUsername(obj.getUsername());
		if (obj.getPassword() != null) {
			user.setPassword(obj.getPassword());
		}
		user.setPermissions(obj.getPermissions());
	}
}
