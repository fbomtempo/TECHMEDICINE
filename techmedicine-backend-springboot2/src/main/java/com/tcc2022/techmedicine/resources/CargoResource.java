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

import com.tcc2022.techmedicine.entities.Cargo;
import com.tcc2022.techmedicine.services.CargoService;

@RestController
@RequestMapping(value = "/cargos")
public class CargoResource {

	@Autowired
	private CargoService cargoService;
	
	@GetMapping
	public ResponseEntity<List<Cargo>> findAll() {
		List<Cargo> list = cargoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/orderBy/descricao")
	public ResponseEntity<List<Cargo>> findAllByOrderByDescricaoAsc() {
		List<Cargo> list = cargoService.findAllByOrderByDescricaoAsc();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Cargo> findById(@PathVariable Long id) {
		Cargo obj = cargoService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Cargo> insert(@RequestBody Cargo obj) {
		obj = cargoService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		cargoService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Cargo> update(@PathVariable Long id, @RequestBody Cargo obj) {
		obj = cargoService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
