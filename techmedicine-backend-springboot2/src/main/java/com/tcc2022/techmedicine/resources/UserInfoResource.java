package com.tcc2022.techmedicine.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tcc2022.techmedicine.entities.UserInfo;
import com.tcc2022.techmedicine.services.UserInfoService;

@RestController
@RequestMapping(value = "/usuarios")
public class UserInfoResource {

	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@GetMapping
	public ResponseEntity<List<UserInfo>> findAll() {
		List<UserInfo> list = userInfoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserInfo> findById(@PathVariable Long id) {
		UserInfo obj = userInfoService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<UserInfo> insert(@RequestBody UserInfo obj) {
		obj.setPassword(passwordEncoder.encode(obj.getPassword()));
		obj = userInfoService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		userInfoService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<UserInfo> update(@PathVariable Long id, @RequestBody UserInfo obj) {
		if (obj.getPassword() != null) {
			obj.setPassword(passwordEncoder.encode(obj.getPassword()));
		}
		obj = userInfoService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}	
}