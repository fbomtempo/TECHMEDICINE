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

import com.tcc2022.techmedicine.entities.UserInfo;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.UserInfoRepository;

@Service
public class UserInfoService {

	@Autowired
	private UserInfoRepository userInfoRepository;

	public List<UserInfo> findAll() {
		return userInfoRepository.findAll().stream().map(user -> {
			user.setPassword(null);
			return user;
		}).collect(Collectors.toList());
	}

	public UserInfo findById(Long id) {
		try {
			UserInfo user = userInfoRepository.findById(id).get();
			user.setPassword(null);
			return user;
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Usuário de id " + id + " não existe");
		}
	}

	@Transactional
	public UserInfo findByUsername(String username) {
		try {
			UserInfo userInfo = userInfoRepository.findByUsername(username).get();
			Hibernate.initialize(userInfo.getPermissions());
			return userInfo;
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Usuário não existe");
		}
	}

	public UserInfo insert(UserInfo obj) {
		try {
			return userInfoRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}

	public void delete(Long id) {
		try {
			userInfoRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}

	public UserInfo update(Long id, UserInfo obj) {
		try {
			UserInfo userInfo = userInfoRepository.findById(id).get();
			updateData(userInfo, obj);
			return userInfoRepository.save(userInfo);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}

	private void updateData(UserInfo userInfo, UserInfo obj) {
		userInfo.setUsername(obj.getUsername());
		if (obj.getPassword() != null) {
			userInfo.setPassword(obj.getPassword());
		}
		userInfo.setPermissions(obj.getPermissions());
	}
}
