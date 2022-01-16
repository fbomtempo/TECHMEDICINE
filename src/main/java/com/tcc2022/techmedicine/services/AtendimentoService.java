package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Atendimento;
import com.tcc2022.techmedicine.repositories.AtendimentoRepository;

@Service
public class AtendimentoService {

	@Autowired
	private AtendimentoRepository atendimentoRepository;
	
	public List<Atendimento> findAll() {
		return atendimentoRepository.findAll();
	}
	
	public Atendimento findById(Long id) {
		Optional<Atendimento> obj = atendimentoRepository.findById(id);
		return obj.get();
	}
	
	public Atendimento insert(Atendimento obj) {
		return atendimentoRepository.save(obj);
	}
	
	public void delete(Long id) {
		atendimentoRepository.deleteById(id);
	}
	
	public Atendimento update(Long id, Atendimento obj) {
		Atendimento atendimento = atendimentoRepository.findById(id).get();
		updateData(atendimento, obj);
		return atendimentoRepository.save(atendimento);
	}
	
	private void updateData(Atendimento atendimento, Atendimento obj) {
		atendimento.setPaciente(obj.getPaciente());
		atendimento.setMedico(obj.getMedico());
		atendimento.setDataAtendimento(obj.getDataAtendimento());
		atendimento.setSituacaoAtendimento(obj.getSituacaoAtendimento());
	}
}
