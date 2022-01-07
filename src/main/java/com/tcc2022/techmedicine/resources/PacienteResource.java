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

import com.tcc2022.techmedicine.entities.Paciente;
import com.tcc2022.techmedicine.services.PacienteService;

@RestController
@RequestMapping(value = "/pacientes")
public class PacienteResource {

	@Autowired
	private PacienteService pacienteService;
	
	@GetMapping
	public ResponseEntity<List<Paciente>> findAll() {
		List<Paciente> list = pacienteService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Paciente> findById(@PathVariable Long id) {
		Paciente paciente = pacienteService.findById(id);
		return ResponseEntity.ok().body(paciente);
	}
	
	@PostMapping
	public ResponseEntity<Paciente> insert(@RequestBody Paciente obj) {
		obj = pacienteService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		pacienteService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Paciente> update(@PathVariable Long id, @RequestBody Paciente obj) {
		obj = pacienteService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	/*@GetMapping
	public ResponseEntity<List<Paciente>> findAll() {
		List<Paciente> list = pacienteService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Paciente> findById(@PathVariable Long id) {
		Paciente paciente = pacienteService.findById(id);
		return ResponseEntity.ok().body(paciente);
	}*/

}
