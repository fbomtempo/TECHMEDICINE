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

import com.tcc2022.techmedicine.entities.Drug;
import com.tcc2022.techmedicine.services.DrugService;

@RestController
@RequestMapping(value = "/medicamentos")
public class DrugResource {
	
	@Autowired
	private DrugService drugService;

	@GetMapping
	public ResponseEntity<List<Drug>> findAll() {
		List<Drug> list = drugService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Drug> findById(@PathVariable Long id) {
		Drug drug = drugService.findById(id);
		return ResponseEntity.ok().body(drug);
	}
	
	@PostMapping
	public ResponseEntity<Drug> insert(@RequestBody Drug obj) {
		obj = drugService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		drugService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Drug> update(@PathVariable Long id, @RequestBody Drug obj) {
		obj = drugService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
