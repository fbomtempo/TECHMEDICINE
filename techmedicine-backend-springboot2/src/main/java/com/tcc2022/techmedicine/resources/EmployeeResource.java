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

import com.tcc2022.techmedicine.entities.Employee;
import com.tcc2022.techmedicine.services.EmployeeService;

@RestController
@RequestMapping(value = "/funcionarios")
public class EmployeeResource {

	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping
	public ResponseEntity<List<Employee>> findAll() {
		List<Employee> list = employeeService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Employee> findById(@PathVariable Long id) {
		Employee employee = employeeService.findById(id);
		return ResponseEntity.ok().body(employee);
	}
	
	@PostMapping
	public ResponseEntity<Employee> insert(@RequestBody Employee obj) {
		obj = employeeService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		employeeService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee obj) {
		obj = employeeService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
