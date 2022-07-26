package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Medic;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.MedicRepository;

@Service
public class MedicService {

	@Autowired
	private MedicRepository medicRepository;
	
	public List<Medic> findAll() {
		return medicRepository.findAllByOrderByIdDesc();
	}
	
	public Medic findById(Long id) {
		try {
			return medicRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Médico de id " + id + " não existe");
		}
	}

	public Medic insert(Medic obj) {
		try {
			return medicRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			medicRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Médico de id " + id + " não existe");
		}
	}
	
	public Medic update(Long id, Medic obj) {
		try {
			Medic medic = medicRepository.findById(id).get();
			updateData(medic, obj);
			return medicRepository.save(medic);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Médico de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Medic medic, Medic obj) {
		medic.setName(obj.getName());
		medic.setSurname(obj.getSurname());
		medic.setBirthDate(obj.getBirthDate());
		medic.setGender(obj.getGender());
		medic.setSpecialty(obj.getSpecialty());
		medic.setCrm(obj.getCrm());
		medic.setGender(obj.getGender());
		medic.setRg(obj.getRg());
		medic.setCpf(obj.getCpf());
		medic.setHomePhone(obj.getHomePhone());
		medic.setMobilePhone(obj.getMobilePhone());
		medic.setEmail(obj.getEmail());
		medic.setCep(obj.getCep());
		medic.setCity(obj.getCity());
		medic.setState(obj.getState());
		medic.setAddress(obj.getAddress());
		medic.setNumber(obj.getNumber());
		medic.setDistrict(obj.getDistrict());
		medic.setComplement(obj.getComplement());
	}
}
