package com.tcc2022.techmedicine.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tcc2022.techmedicine.entities.User;
import com.tcc2022.techmedicine.repositories.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String user) throws UsernameNotFoundException {
		User u = userRepository.findByUsername(user)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + user));
		return UserDetailsImpl.build(u);
	}
}