package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Medic;
import com.tcc2022.techmedicine.repositories.MedicRepository;

@Service
public class MedicService {

	@Autowired
	private MedicRepository medicRepository;
	
	public List<Medic> findAll() {
		return medicRepository.findAllByOrderByIdDesc();
	}
	
	public Medic findById(Long id) {
		Optional<Medic> medic = medicRepository.findById(id);
		return medic.get();
	}

	public Medic insert(Medic obj) {
		return medicRepository.save(obj);
	}
	
	public void delete(Long id) {
		medicRepository.deleteById(id);
	}
	
	public Medic update(Long id, Medic obj) {
		Medic medic = medicRepository.findById(id).get();
		updateData(medic, obj);
		return medicRepository.save(medic);
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
