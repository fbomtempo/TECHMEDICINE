package com.tcc2022.techmedicine.config.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Usuario;
import com.tcc2022.techmedicine.services.UserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = userService.findByUsername(username);
		List<String> permissions = usuario.getPermissions().stream().map(permission -> permission.getDescription().getCode()).collect(Collectors.toList());
		String[] permissionArray = permissions.toArray(new String[0]);
		return User
				.builder()
				.username(usuario.getUsername())
				.password(usuario.getPassword())
				.roles(permissionArray)
				.build();
	}

}
