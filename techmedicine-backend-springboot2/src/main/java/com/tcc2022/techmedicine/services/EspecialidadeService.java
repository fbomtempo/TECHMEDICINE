package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Especialidade;
import com.tcc2022.techmedicine.repositories.EspecialidadeRepository;

@Service
public class EspecialidadeService {

	@Autowired
	private EspecialidadeRepository especialidadeRepository;
	
	public List<Especialidade> findAll() {
		return especialidadeRepository.findAllByOrderByIdAsc();
	}

	public Especialidade findById(Long id) {
		Optional<Especialidade> obj = especialidadeRepository.findById(id);
		return obj.orElseThrow(() -> new NoSuchElementException("Objeto de 'id " + id + "' não encontrado."));
	}
	
	public Especialidade insert(Especialidade obj) {
		try {
			return especialidadeRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
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
