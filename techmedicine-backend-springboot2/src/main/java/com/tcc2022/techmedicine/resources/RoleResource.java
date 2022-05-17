package com.tcc2022.techmedicine.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tcc2022.techmedicine.entities.Role;
import com.tcc2022.techmedicine.services.RoleService;

@RestController
@RequestMapping(value = "/cargos")
public class RoleResource {

	@Autowired
	private RoleService roleService;
	
	@GetMapping
	public ResponseEntity<List<Role>> findAll() {
		List<Role> list = roleService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/orderBy/descricao")
	public ResponseEntity<List<Role>> findAllByOrderByDescriptionAsc() {
		List<Role> list = roleService.findAllByOrderByDescriptionAsc();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Role> findById(@PathVariable Long id) {
		Role obj = roleService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Role> insert(@RequestBody Role obj) {
		obj = roleService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		roleService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Role> update(@PathVariable Long id, @RequestBody Role obj) {
		obj = roleService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
