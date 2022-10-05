package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Disease;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.DiseaseRepository;

@Service
public class DiseaseService {

	@Autowired
	private DiseaseRepository diseaseRepository;
	
	public List<Disease> findAll(Sort sort) {
		return diseaseRepository.findAll(sort);
	}
	
	public Page<Disease> findAll(Pageable pageable, String filter) {
		if (filter.isBlank()) {
			return this.diseaseRepository.findAll(pageable);
		}
		return this.diseaseRepository.findDiseasesByFilter(pageable, filter);
	}

	public Disease findById(Long id) {
		try {	
			return diseaseRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Disease insert(Disease obj) {
		try {
			return diseaseRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		try {
			diseaseRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Disease update(Long id, Disease obj) {
		try {
			Disease specialty = diseaseRepository.findById(id).get();
			updateData(specialty, obj);
			return diseaseRepository.save(specialty);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Disease specialty, Disease obj) {
		specialty.setDescription(obj.getDescription());
	}
	
	public List<Disease> findAllByOrderByDescriptionAsc() {
		return diseaseRepository.findAllByOrderByDescriptionAsc();
	}
}
