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

import com.tcc2022.techmedicine.entities.Agendamento;
import com.tcc2022.techmedicine.services.AgendamentoService;

@RestController
@RequestMapping(value = "/agendamentos")
public class AgendamentoResource {

	@Autowired
	private AgendamentoService agendamentoService;
	
	@GetMapping
	public ResponseEntity<List<Agendamento>> findAll() {
		List<Agendamento> list = agendamentoService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Agendamento> findById(@PathVariable Long id) {
		Agendamento obj = agendamentoService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Agendamento> insert(@RequestBody Agendamento obj) {
		obj = agendamentoService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		agendamentoService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Agendamento> update(@PathVariable Long id, @RequestBody Agendamento obj) {
		obj = agendamentoService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
