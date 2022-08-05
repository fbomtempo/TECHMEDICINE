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

import com.tcc2022.techmedicine.entities.Specialty;
import com.tcc2022.techmedicine.services.SpecialtyService;

@RestController
@RequestMapping(value = "/especialidades")
public class SpecialtyResource {

	@Autowired
	private SpecialtyService specialtyService;
	
	@GetMapping
	public ResponseEntity<List<Specialty>> findAll() {
		List<Specialty> list = specialtyService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Specialty> findById(@PathVariable Long id) {
		Specialty obj = specialtyService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Specialty> insert(@RequestBody Specialty obj) {
		obj = specialtyService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		specialtyService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Specialty> update(@PathVariable Long id, @RequestBody Specialty obj) {
		obj = specialtyService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/ordenar/descricao/crescente")
	public ResponseEntity<List<Specialty>> findAllByOrderByDescriptionAsc() {
		List<Specialty> list = specialtyService.findAllByOrderByDescriptionAsc();
		return ResponseEntity.ok().body(list);
	}
}
