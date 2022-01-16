package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Especialidade;
import com.tcc2022.techmedicine.repositories.EspecialidadeRepository;

@Service
public class EspecialidadeService {

	@Autowired
	private EspecialidadeRepository especialidadeRepository;
	
	public List<Especialidade> findAll() {
		return especialidadeRepository.findAll();
	}
	
	public Especialidade findById(Long id) {
		Optional<Especialidade> obj = especialidadeRepository.findById(id);
		return obj.get();
	}
	
	public Especialidade insert(Especialidade obj) {
		return especialidadeRepository.save(obj);
	}
	
	public void delete(Long id) {
		especialidadeRepository.deleteById(id);
	}
	
	public Especialidade update(Long id, Especialidade obj) {
		Especialidade especialidade = especialidadeRepository.findById(id).get();
		updateData(especialidade, obj);
		return especialidadeRepository.save(especialidade);
	}
	
	private void updateData(Especialidade especialidade, Especialidade obj) {
		especialidade.setDescricao(obj.getDescricao());
	}
}
