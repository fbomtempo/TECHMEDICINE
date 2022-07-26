package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Specialty;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.SpecialtyRepository;

@Service
public class SpecialtyService {

	@Autowired
	private SpecialtyRepository specialtyRepository;
	
	public List<Specialty> findAll() {
		return specialtyRepository.findAllByOrderByIdDesc();
	}

	public Specialty findById(Long id) {
		try {	
			return specialtyRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Specialty insert(Specialty obj) {
		try {
			return specialtyRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		try {
			specialtyRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		}
	}
	
	public Specialty update(Long id, Specialty obj) {
		try {
			Specialty specialty = specialtyRepository.findById(id).get();
			updateData(specialty, obj);
			return specialtyRepository.save(specialty);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Especialidade de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Specialty specialty, Specialty obj) {
		specialty.setDescription(obj.getDescription());
	}
}
