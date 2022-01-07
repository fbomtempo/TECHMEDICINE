package com.tcc2022.techmedicine.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Medico;
import com.tcc2022.techmedicine.repositories.MedicoRepository;

@Service
public class MedicoService {

	@Autowired
	private MedicoRepository medicoRepository;
	
	public List<Medico> findAll() {
		return medicoRepository.findAll();
	}
}
