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

import com.tcc2022.techmedicine.entities.AttendanceHeader;
import com.tcc2022.techmedicine.services.AttendanceHeaderService;

@RestController
@RequestMapping(value = "/atendimentos")
public class AttendanceHeaderResource {

	@Autowired
	private AttendanceHeaderService attendanceHeaderService;
	
	@GetMapping
	public ResponseEntity<List<AttendanceHeader>> findAll() {
		List<AttendanceHeader> list = attendanceHeaderService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<AttendanceHeader> findById(@PathVariable Long id) {
		AttendanceHeader obj = attendanceHeaderService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<AttendanceHeader> insert(@RequestBody AttendanceHeader obj) {
		obj = attendanceHeaderService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		attendanceHeaderService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<AttendanceHeader> update(@PathVariable Long id, @RequestBody AttendanceHeader obj) {
		obj = attendanceHeaderService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
