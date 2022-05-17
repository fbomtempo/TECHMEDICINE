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

import com.tcc2022.techmedicine.entities.Attendance;
import com.tcc2022.techmedicine.services.AttendanceService;

@RestController
@RequestMapping(value = "/atendimentos")
public class AttendanceResource {

	@Autowired
	private AttendanceService attendanceService;
	
	@GetMapping
	public ResponseEntity<List<Attendance>> findAll() {
		List<Attendance> list = attendanceService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Attendance> findById(@PathVariable Long id) {
		Attendance obj = attendanceService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Attendance> insert(@RequestBody Attendance obj) {
		obj = attendanceService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		attendanceService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Attendance> update(@PathVariable Long id, @RequestBody Attendance obj) {
		obj = attendanceService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
