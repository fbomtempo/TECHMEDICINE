package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Produto;
import com.tcc2022.techmedicine.repositories.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;
	
	public List<Produto> findAll() {
		return produtoRepository.findAll();
	}
	
	public Produto findById(Long id) {
		Optional<Produto> obj = produtoRepository.findById(id);
		return obj.get();
	}
	
	public Produto insert(Produto obj) {
		return produtoRepository.save(obj);
	}
	
	public void delete(Long id) {
		produtoRepository.deleteById(id);
	}
	
	public Produto update(Long id, Produto obj) {
		Produto produto = produtoRepository.findById(id).get();
		updateData(produto, obj);
		return produtoRepository.save(produto);
	}
	
	private void updateData(Produto produto, Produto obj) {
		produto.setDescricao(obj.getDescricao());
		produto.setPrecoUnitario(obj.getPrecoUnitario());
		produto.setEstoque(obj.getEstoque());
		produto.setCategoria(obj.getCategoria());
	}
}
