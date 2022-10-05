package com.tcc2022.techmedicine.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tcc2022.techmedicine.entities.Medic;
import com.tcc2022.techmedicine.services.MedicService;

@RestController
@RequestMapping(value = "/medicos")
public class MedicResource {
	
	@Autowired
	private MedicService medicService;
	
	@GetMapping
	public ResponseEntity<List<Medic>> findAll(Sort sort) {
		List<Medic> list = medicService.findAll(sort);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/pageable")
	public ResponseEntity<Page<Medic>> findAll(Pageable pageable, @RequestParam String filter) {
		Page<Medic> page = medicService.findAll(pageable, filter);
		return ResponseEntity.ok().body(page);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Medic> findById(@PathVariable Long id) {
		Medic medic = medicService.findById(id);
		return ResponseEntity.ok().body(medic);
	}
	
	@PostMapping
	public ResponseEntity<Medic> insert(@RequestBody Medic obj) {
		obj = medicService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		medicService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Medic> update(@PathVariable Long id, @RequestBody Medic obj) {
		obj = medicService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/ordenar/nomeSobrenome/crescente")
	public ResponseEntity<List<Medic>> findAllByOrderByNameAscSurnameAsc() {
		List<Medic> list = medicService.findAllByOrderByNameAscSurnameAsc();
		return ResponseEntity.ok().body(list);
	}
}
