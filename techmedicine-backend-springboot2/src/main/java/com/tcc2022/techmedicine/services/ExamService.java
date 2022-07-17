package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Exam;
import com.tcc2022.techmedicine.exceptions.exception.DatabaseException;
import com.tcc2022.techmedicine.exceptions.exception.NotFoundException;
import com.tcc2022.techmedicine.repositories.ExamRepository;

@Service
public class ExamService {

	@Autowired
	private ExamRepository examRepository;
	
	public List<Exam> findAll() {
		return examRepository.findAllByOrderByIdDesc();
	}
	
	public Exam findById(Long id) {
		try {
			return examRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Exame de id " + id + " não existe");
		}
	}

	public Exam insert(Exam obj) {
		try {
			return examRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			examRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Exame de id " + id + " não existe");
		}
	}
	
	public Exam update(Long id, Exam obj) {
		try {
			Exam exam = examRepository.findById(id).get();
			updateData(exam, obj);
			return examRepository.save(exam);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Exame de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Exam exam, Exam obj) {
		exam.setDescription(obj.getDescription());
	}
}
