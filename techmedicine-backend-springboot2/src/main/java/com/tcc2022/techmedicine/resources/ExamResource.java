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

import com.tcc2022.techmedicine.entities.Exam;
import com.tcc2022.techmedicine.services.ExamService;

@RestController
@RequestMapping(value = "/exames")
public class ExamResource {
	
	@Autowired
	private ExamService examService;

	@GetMapping
	public ResponseEntity<List<Exam>> findAll() {
		List<Exam> list = examService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Exam> findById(@PathVariable Long id) {
		Exam exam = examService.findById(id);
		return ResponseEntity.ok().body(exam);
	}
	
	@PostMapping
	public ResponseEntity<Exam> insert(@RequestBody Exam obj) {
		obj = examService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		examService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Exam> update(@PathVariable Long id, @RequestBody Exam obj) {
		obj = examService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
