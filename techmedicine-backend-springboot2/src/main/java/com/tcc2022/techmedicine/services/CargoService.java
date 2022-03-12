package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Cargo;
import com.tcc2022.techmedicine.repositories.CargoRepository;

@Service
public class CargoService {

	@Autowired
	private CargoRepository cargoRepository;
	
	public List<Cargo> findAll() {
		return cargoRepository.findAllByOrderByIdAsc();
	}
	
	public List<Cargo> findAllByOrderByDescricaoAsc() {
		return cargoRepository.findAllByOrderByDescricaoAsc();
	}

	public Cargo findById(Long id) {
		Optional<Cargo> obj = cargoRepository.findById(id);
		return obj.orElseThrow(() -> new NoSuchElementException("Objeto de 'id " + id + "' não encontrado."));
	}
	
	public Cargo insert(Cargo obj) {
		try {
			return cargoRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DataIntegrityViolationException("Integridade do banco de dados violada.");
		}
	}
	
	public void delete(Long id) {
		cargoRepository.deleteById(id);
	}
	
	public Cargo update(Long id, Cargo obj) {
		Cargo cargo = cargoRepository.findById(id).get();
		updateData(cargo, obj);
		return cargoRepository.save(cargo);
	}
	
	private void updateData(Cargo cargo, Cargo obj) {
		cargo.setDescricao(obj.getDescricao());
	}
}
