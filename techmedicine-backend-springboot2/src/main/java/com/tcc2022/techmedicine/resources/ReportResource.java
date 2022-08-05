package com.tcc2022.techmedicine.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc2022.techmedicine.services.ReportService;

@RestController
@RequestMapping(value = "/relatorios")
public class ReportResource {

	@Autowired
	private ReportService reportService;
	
	@GetMapping(value = "/totalPacientes")
	public Long countPatients() {
		return reportService.countPatients();
	}
	
	@GetMapping(value = "/totalAgendamentos")
	public Long countAppointments() {
		return reportService.countAppointments();
	}
	
	@GetMapping(value = "/totalAtendimentos")
	public Long countCheckUps() {
		return reportService.countCheckUps();
	}
}
