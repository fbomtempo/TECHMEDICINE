package com.tcc2022.techmedicine.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tcc2022.techmedicine.entities.Usuario;
import com.tcc2022.techmedicine.repositories.UsuarioRepository;

@Service
public class DetalheUsuarioServiceImpl implements UserDetailsService {
	
	@Autowired
	UsuarioRepository userRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
		Usuario user = userRepository.findByUsuario(usuario)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + usuario));
		return DetalheUsuarioImpl.build(user);
	}
}