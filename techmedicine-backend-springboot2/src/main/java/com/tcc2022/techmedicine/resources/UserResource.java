package com.tcc2022.techmedicine.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc2022.techmedicine.entities.User;
import com.tcc2022.techmedicine.services.UserService;

@RestController
@RequestMapping(value = "/usuarios")
public class UserResource {

	@Autowired
	private UserService usuarioService;
	
	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		List<User> list = usuarioService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<User> findById(@PathVariable Long id) {
		User obj = usuarioService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
}
