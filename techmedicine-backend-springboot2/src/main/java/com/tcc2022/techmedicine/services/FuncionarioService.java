package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Funcionario;
import com.tcc2022.techmedicine.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	public List<Funcionario> findAll() {
		List<Funcionario> list = funcionarioRepository.findAllByOrderByIdAsc();
		return list;
	}
	
	public Funcionario findById(Long id) {
		Optional<Funcionario> obj = funcionarioRepository.findById(id);
		return obj.get();
	}

	public Funcionario insert(Funcionario obj) {
		return funcionarioRepository.save(obj);
	}
	
	public void delete(Long id) {
		funcionarioRepository.deleteById(id);
	}
	
	public Funcionario update(Long id, Funcionario obj) {
		Funcionario funcionario = funcionarioRepository.findById(id).get();
		updateData(funcionario, obj);
		return funcionarioRepository.save(funcionario);
	}
	
	private void updateData(Funcionario funcionario, Funcionario obj) {
		funcionario.setNome(obj.getNome());
		funcionario.setSobrenome(obj.getSobrenome());
		funcionario.setNascimento(obj.getNascimento());
		funcionario.setSexo(obj.getSexo());
		funcionario.setCargo(obj.getCargo());
		funcionario.setRg(obj.getRg());
		funcionario.setCpf(obj.getCpf());
		funcionario.setTelefoneResidencial(obj.getCpf());
		funcionario.setTelefoneCelular(obj.getTelefoneCelular());
		funcionario.setEmail(obj.getEmail());
		funcionario.setCep(obj.getCep());
		funcionario.setCidade(obj.getCidade());
		funcionario.setEstado(obj.getEstado());
		funcionario.setEndereco(obj.getEndereco());
		funcionario.setNumero(obj.getNumero());
		funcionario.setBairro(obj.getBairro());
		funcionario.setComplemento(obj.getComplemento());
	}
}
