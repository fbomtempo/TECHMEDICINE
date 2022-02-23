package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Categoria;
import com.tcc2022.techmedicine.repositories.CategoriaRepository;

@Service
public class CategoriaService {

	@Autowired
	private CategoriaRepository categoriaRepository;
	
	public List<Categoria> findAll() {
		return categoriaRepository.findAll();
	}
	
	public Categoria findById(Long id) {
		Optional<Categoria> obj = categoriaRepository.findById(id);
		return obj.get();
	}
	
	public Categoria insert(Categoria obj) {
		return categoriaRepository.save(obj);
	}
	
	public void delete(Long id) {
		categoriaRepository.deleteById(id);
	}
	
	public Categoria update(Long id, Categoria obj) {
		Categoria categoria = categoriaRepository.findById(id).get();
		updateData(categoria, obj);
		return categoriaRepository.save(categoria);
	}
	
	private void updateData(Categoria categoria, Categoria obj) {
		categoria.setDescricao(obj.getDescricao());
	}
}
