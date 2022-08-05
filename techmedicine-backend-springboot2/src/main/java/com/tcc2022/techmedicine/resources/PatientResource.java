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

import com.tcc2022.techmedicine.entities.Patient;
import com.tcc2022.techmedicine.services.PatientService;

@RestController
@RequestMapping(value = "/pacientes")
/*@PreAuthorize("hasRole('FUNCIONARIO') or hasRole('MEDICO') or hasRole('ADMIN')")*/
public class PatientResource {

	@Autowired
	private PatientService patientService;
	
	@GetMapping
	public ResponseEntity<List<Patient>> findAll() {
		List<Patient> list = patientService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Patient> findById(@PathVariable Long id) {
		Patient patient = patientService.findById(id);
		return ResponseEntity.ok().body(patient);
	}
	
	@PostMapping
	public ResponseEntity<Patient> insert(@RequestBody Patient obj) {
		obj = patientService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		patientService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Patient> update(@PathVariable Long id, @RequestBody Patient obj) {
		obj = patientService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/ordenar/nomeSobrenome/crescente")
	public ResponseEntity<List<Patient>> findAllByOrderByNameAscSurnameAsc() {
		List<Patient> list = patientService.findAllByOrderByNameAscSurnameAsc();
		return ResponseEntity.ok().body(list);
	}
}
