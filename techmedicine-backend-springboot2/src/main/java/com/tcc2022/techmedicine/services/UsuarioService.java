package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Usuario;
import com.tcc2022.techmedicine.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}
	
	public Usuario findById(Long id) {
		Optional<Usuario> obj = usuarioRepository.findById(id);
		return obj.get();
	}
	
	public void delete(Long id) {
		usuarioRepository.deleteById(id);
	}
	
	public Usuario update(Long id, Usuario obj) {
		Usuario usuario = usuarioRepository.findById(id).get();
		updateData(usuario, obj);
		return usuarioRepository.save(usuario);
	}
	
	private void updateData(Usuario usuario, Usuario obj) {
		usuario.setUsuario(obj.getUsuario());
		usuario.setEmail(obj.getEmail());
		usuario.setSenha(obj.getSenha());
	}
}
