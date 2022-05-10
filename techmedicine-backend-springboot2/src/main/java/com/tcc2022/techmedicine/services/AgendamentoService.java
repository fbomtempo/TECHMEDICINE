package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Agendamento;
import com.tcc2022.techmedicine.repositories.AgendamentoRepository;

@Service
public class AgendamentoService {

	@Autowired
	private AgendamentoRepository agendamentoRepository;
	
	public List<Agendamento> findAll() {
		return agendamentoRepository.findAll();
	}
	
	public Agendamento findById(Long id) {
		Optional<Agendamento> obj = agendamentoRepository.findById(id);
		return obj.get();
	}
	
	public Agendamento insert(Agendamento obj) {
		return agendamentoRepository.save(obj);
	}
	
	public void delete(Long id) {
		agendamentoRepository.deleteById(id);
	}
	
	public Agendamento update(Long id, Agendamento obj) {
		Agendamento agendamento = agendamentoRepository.findById(id).get();
		updateData(agendamento, obj);
		return agendamentoRepository.save(agendamento);
	}
	
	private void updateData(Agendamento agendamento, Agendamento obj) {
		agendamento.setPaciente(obj.getPaciente());
		agendamento.setMedico(obj.getMedico());
		agendamento.setDataAgendada(obj.getDataAgendada());
		agendamento.setSituacaoAgendamento(obj.getSituacaoAgendamento());
	}
}
