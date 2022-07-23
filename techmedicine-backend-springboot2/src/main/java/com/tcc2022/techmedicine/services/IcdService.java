package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Icd;
import com.tcc2022.techmedicine.exceptions.exception.DatabaseException;
import com.tcc2022.techmedicine.exceptions.exception.NotFoundException;
import com.tcc2022.techmedicine.repositories.IcdRepository;

@Service
public class IcdService {

	@Autowired
	private IcdRepository icdRepository;
	
	public List<Icd> findAll() {
		return icdRepository.findAllByOrderByIdDesc();
	}

	public Icd findById(Long id) {
		try {	
			return icdRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Icd insert(Icd obj) {
		try {
			return icdRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		try {
			icdRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Icd update(Long id, Icd obj) {
		try {
			Icd specialty = icdRepository.findById(id).get();
			updateData(specialty, obj);
			return icdRepository.save(specialty);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Icd specialty, Icd obj) {
		specialty.setDescription(obj.getDescription());
	}
}
