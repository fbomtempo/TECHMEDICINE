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

import com.tcc2022.techmedicine.entities.CheckUp;
import com.tcc2022.techmedicine.services.CheckUpService;

@RestController
@RequestMapping(value = "/atendimentos")
public class CheckUpResource {

	@Autowired
	private CheckUpService checkUpService;
	
	@GetMapping
	public ResponseEntity<List<CheckUp>> findAll() {
		List<CheckUp> list = checkUpService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CheckUp> findById(@PathVariable Long id) {
		CheckUp obj = checkUpService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<CheckUp> insert(@RequestBody CheckUp obj) {
		obj = checkUpService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		checkUpService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CheckUp> update(@PathVariable Long id, @RequestBody CheckUp obj) {
		obj = checkUpService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/paciente/{id}")
	public ResponseEntity<List<CheckUp>> findAllByPatient(@PathVariable Long id) {
		List<CheckUp> list = checkUpService.findAllByPatient(id);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/finalizados")
	public ResponseEntity<List<CheckUp>> findAllByCheckUpSituation() {
		List<CheckUp> list = checkUpService.findAllByCheckUpSituation();
		return ResponseEntity.ok().body(list);
	}
}
