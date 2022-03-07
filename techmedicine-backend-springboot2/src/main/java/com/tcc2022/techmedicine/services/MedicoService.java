package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Medico;
import com.tcc2022.techmedicine.repositories.MedicoRepository;

@Service
public class MedicoService {

	@Autowired
	private MedicoRepository medicoRepository;
	
	public List<Medico> findAll() {
		return medicoRepository.findAllByOrderByIdAsc();
	}
	
	public Medico findById(Long id) {
		Optional<Medico> medico = medicoRepository.findById(id);
		return medico.get();
	}

	public Medico insert(Medico obj) {
		return medicoRepository.save(obj);
	}
	
	public void delete(Long id) {
		medicoRepository.deleteById(id);
	}
	
	public Medico update(Long id, Medico obj) {
		Medico medico = medicoRepository.findById(id).get();
		updateData(medico, obj);
		return medicoRepository.save(medico);
	}
	
	private void updateData(Medico medico, Medico obj) {
		medico.setNome(obj.getNome());
		medico.setSobrenome(obj.getSobrenome());
		medico.setNascimento(obj.getNascimento());
		medico.setSexo(obj.getSexo());
		medico.setCrm(obj.getCrm());
		medico.setEspecialidade(obj.getEspecialidade());
		medico.setRg(obj.getRg());
		medico.setCpf(obj.getCpf());
		medico.setTelefoneResidencial(obj.getTelefoneResidencial());
		medico.setTelefoneCelular(obj.getTelefoneCelular());
		medico.setEmail(obj.getEmail());
		medico.setCep(obj.getCep());
		medico.setCidade(obj.getCidade());
		medico.setEstado(obj.getEstado());
		medico.setEndereco(obj.getEndereco());
		medico.setNumero(obj.getNumero());
		medico.setBairro(obj.getBairro());
		medico.setComplemento(obj.getComplemento());
	}
}
