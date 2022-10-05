package com.tcc2022.techmedicine.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

import com.tcc2022.techmedicine.entities.Appointment;
import com.tcc2022.techmedicine.services.AppointmentService;

@RestController
@RequestMapping(value = "/agendamentos")
public class AppointmentResource {

	@Autowired
	private AppointmentService appointmentService;
	
	@GetMapping
	public ResponseEntity<List<Appointment>> findAll(Sort sort) {
		List<Appointment> list = appointmentService.findAll(sort);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Appointment> findById(@PathVariable Long id) {
		Appointment obj = appointmentService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Appointment> insert(@RequestBody Appointment obj) {
		obj = appointmentService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		appointmentService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Appointment> update(@PathVariable Long id, @RequestBody Appointment obj) {
		obj = appointmentService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
