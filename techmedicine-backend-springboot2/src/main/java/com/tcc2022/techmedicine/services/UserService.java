package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.User;
import com.tcc2022.techmedicine.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository usuarioRepository;
	
	public List<User> findAll() {
		return usuarioRepository.findAll();
	}
	
	public User findById(Long id) {
		Optional<User> obj = usuarioRepository.findById(id);
		return obj.get();
	}
}
