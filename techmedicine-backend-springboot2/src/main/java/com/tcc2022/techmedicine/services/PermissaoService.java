package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Permissao;
import com.tcc2022.techmedicine.repositories.PermissaoRepository;

@Service
public class PermissaoService {

	@Autowired
	private PermissaoRepository permissaoRepository;
	
	public List<Permissao> findAll() {
		return permissaoRepository.findAll();
	}
	
	public Permissao findById(Long id) {
		Optional<Permissao> obj = permissaoRepository.findById(id);
		return obj.get();
	}
	
	public Permissao insert(Permissao obj) {
		return permissaoRepository.save(obj);
	}
	
	public void delete(Long id) {
		permissaoRepository.deleteById(id);
	}
}
