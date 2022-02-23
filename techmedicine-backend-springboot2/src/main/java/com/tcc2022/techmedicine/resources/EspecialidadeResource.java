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

import com.tcc2022.techmedicine.entities.Especialidade;
import com.tcc2022.techmedicine.services.EspecialidadeService;

@RestController
@RequestMapping(value = "/especialidades")
public class EspecialidadeResource {

	@Autowired
	private EspecialidadeService especialidadeService;
	
	@GetMapping
	public ResponseEntity<List<Especialidade>> findAll() {
		List<Especialidade> list = especialidadeService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<Especialidade> findById(@PathVariable Long id) {
		Especialidade obj = especialidadeService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@GetMapping(value = "/descricao/{descricao}")
	public ResponseEntity<List<Especialidade>> findByDescricao(@PathVariable String descricao) {
		List<Especialidade> list = especialidadeService.findByDescricao(descricao);
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping
	public ResponseEntity<Especialidade> insert(@RequestBody Especialidade obj) {
		obj = especialidadeService.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		especialidadeService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<Especialidade> update(@PathVariable Long id, @RequestBody Especialidade obj) {
		obj = especialidadeService.update(id, obj);
		return ResponseEntity.ok().body(obj);
	}
}
