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

import com.tcc2022.techmedicine.entities.CheckUpHeader;
import com.tcc2022.techmedicine.services.CheckUpHeaderService;

@RestController
@RequestMapping(value = "/cabecalhos-atendimento")
public class CheckUpHeaderResource {

	@Autowired
	private CheckUpHeaderService checkUpHeaderService;
	
	@GetMapping
	public ResponseEntity<List<CheckUpHeader>> findAll() {
		List<CheckUpHeader> list = checkUpHeaderService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CheckUpHeader> findById(@PathVariable Long id) {
		CheckUpHeader obj = checkUpHeaderService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<CheckUpHeader> insert(@RequestBody CheckUpHeader obj) {
		obj = checkUpHeaderService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		checkUpHeaderService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<CheckUpHeader> update(@PathVariable Long id, @RequestBody CheckUpHeader obj) {
		obj = checkUpHeaderService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
