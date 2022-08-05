package com.tcc2022.techmedicine.security.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.services.UserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.tcc2022.techmedicine.entities.User user = userService.findByUsername(username);
		List<String> permissions = user.getPermissions().stream().map(permission -> permission.getDescription().getCode()).collect(Collectors.toList());
		String[] permissionArray = permissions.toArray(new String[0]);
		return User
				.builder()
				.username(user.getUsername())
				.password(user.getPassword())
				.roles(permissionArray)
				.build();
	}

}
