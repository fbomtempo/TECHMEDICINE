package com.tcc2022.techmedicine.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tcc2022.techmedicine.entities.Disease;
import com.tcc2022.techmedicine.entities.Role;
import com.tcc2022.techmedicine.services.DiseaseService;

@RestController
@RequestMapping(value = "/doencas")
public class DiseaseResource {

	@Autowired
	private DiseaseService diseaseService;
	
	@GetMapping
	public ResponseEntity<List<Disease>> findAll(Sort sort) {
		List<Disease> list = diseaseService.findAll(sort);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/pageable")
	public ResponseEntity<Page<Disease>> findAll(Pageable pageable, @RequestParam String filter) {
		Page<Disease> page = diseaseService.findAll(pageable, filter);
		return ResponseEntity.ok().body(page);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Disease> findById(@PathVariable Long id) {
		Disease obj = diseaseService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@PostMapping
	public ResponseEntity<Disease> insert(@RequestBody Disease obj) {
		obj = diseaseService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		diseaseService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Disease> update(@PathVariable Long id, @RequestBody Disease obj) {
		obj = diseaseService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/ordenar/descricao/crescente")
	public ResponseEntity<List<Disease>> findAllByOrderByDescriptionAsc() {
		List<Disease> list = diseaseService.findAllByOrderByDescriptionAsc();
		return ResponseEntity.ok().body(list);
	}
}
