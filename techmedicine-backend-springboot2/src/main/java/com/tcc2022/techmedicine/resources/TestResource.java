package com.tcc2022.techmedicine.resources;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/test")
public class TestResource {
	@GetMapping("/all")
	public String allAccess() {
		return "Public Content.";
	}
	
	@GetMapping("/funcionario")
	@PreAuthorize("hasRole('FUNCIONARIO') or hasRole('MEDICO') or hasRole('ADMIN')")
	public String userAccess() {
		return "Funcionario Content.";
	}

	@GetMapping("/medico")
	@PreAuthorize("hasRole('MEDICO') or hasRole('ADMIN')")
	public String moderatorAccess() {
		return "Medico Board.";
	}
	
	@GetMapping("/admin")
	@PreAuthorize("hasRole('ADMIN')")
	public String adminAccess() {
		return "Admin Board.";
	}
}