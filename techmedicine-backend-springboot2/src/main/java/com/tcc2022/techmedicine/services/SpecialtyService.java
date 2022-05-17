package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Specialty;
import com.tcc2022.techmedicine.repositories.SpecialtyRepository;

@Service
public class SpecialtyService {

	@Autowired
	private SpecialtyRepository especialidadeRepository;
	
	public List<Specialty> findAll() {
		return especialidadeRepository.findAllByOrderByIdDesc();
	}
	
	public List<Specialty> findAllByOrderByDescriptionAsc() {
		return especialidadeRepository.findAllByOrderByDescriptionAsc();
	}

	public Specialty findById(Long id) {
		Optional<Specialty> obj = especialidadeRepository.findById(id);
		return obj.orElseThrow(() -> new NoSuchElementException("Objeto de 'id " + id + "' não encontrado."));
	}
	
	public Specialty insert(Specialty obj) {
		try {
			return especialidadeRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		especialidadeRepository.deleteById(id);
	}
	
	public Specialty update(Long id, Specialty obj) {
		Specialty specialty = especialidadeRepository.findById(id).get();
		updateData(specialty, obj);
		return especialidadeRepository.save(specialty);
	}
	
	private void updateData(Specialty specialty, Specialty obj) {
		specialty.setDescription(obj.getDescription());
	}
}
