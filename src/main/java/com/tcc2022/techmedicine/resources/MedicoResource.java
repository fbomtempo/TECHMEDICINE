package com.tcc2022.techmedicine.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc2022.techmedicine.entities.Medico;
import com.tcc2022.techmedicine.services.MedicoService;

@RestController
@RequestMapping(value = "/medicos")
public class MedicoResource {
	
	@Autowired
	private MedicoService medicoService;

	@GetMapping
	public ResponseEntity<List<Medico>> findAll() {
		List<Medico> list = medicoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Medico> findById(@PathVariable Long id) {
		Medico medico = medicoService.findById(id);
		return ResponseEntity.ok().body(medico);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		medicoService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Medico> update(@PathVariable Long id, @RequestBody Medico obj) {
		obj = medicoService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
