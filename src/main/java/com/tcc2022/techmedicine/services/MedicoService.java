package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

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
	
	public Medico findById(Long id) {
		Optional<Medico> medico = medicoRepository.findById(id);
		return medico.get();
	}

	public void delete(Long id) {
		medicoRepository.deleteById(id);
	}
	
	public Medico update(Long id, Medico obj) {
		Medico medico = medicoRepository.findById(id).get();
		medico.setNome(obj.getNome());
		medico.setCpf(obj.getCpf());
		medico.setCrm(obj.getCrm());
		return medicoRepository.save(medico);
	}
}
