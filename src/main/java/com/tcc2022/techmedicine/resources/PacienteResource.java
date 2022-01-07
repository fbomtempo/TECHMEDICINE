package com.tcc2022.techmedicine.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	/*@GetMapping
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
		pacienteService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}*/
}
