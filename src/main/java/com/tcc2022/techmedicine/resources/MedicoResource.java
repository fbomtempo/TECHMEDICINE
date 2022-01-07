package com.tcc2022.techmedicine.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
}
