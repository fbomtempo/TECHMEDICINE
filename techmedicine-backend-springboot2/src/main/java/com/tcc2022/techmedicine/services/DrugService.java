package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Drug;
import com.tcc2022.techmedicine.exceptions.exception.DatabaseException;
import com.tcc2022.techmedicine.exceptions.exception.NotFoundException;
import com.tcc2022.techmedicine.repositories.DrugRepository;

@Service
public class DrugService {

	@Autowired
	private DrugRepository drugRepository;
	
	public List<Drug> findAll() {
		return drugRepository.findAllByOrderByIdDesc();
	}
	
	public Drug findById(Long id) {
		try {
			return drugRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Medicamento de id " + id + " não existe");
		}
	}

	public Drug insert(Drug obj) {
		try {
			return drugRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			drugRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Medicamento de id " + id + " não existe");
		}
	}
	
	public Drug update(Long id, Drug obj) {
		try {
			Drug drug = drugRepository.findById(id).get();
			updateData(drug, obj);
			return drugRepository.save(drug);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Medicamento de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Drug drug, Drug obj) {
		drug.setDescription(obj.getDescription());
	}
}
