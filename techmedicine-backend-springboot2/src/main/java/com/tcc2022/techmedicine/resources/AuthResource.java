package com.tcc2022.techmedicine.resources;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc2022.techmedicine.entities.Permission;
import com.tcc2022.techmedicine.entities.User;
import com.tcc2022.techmedicine.payload.request.LoginRequest;
import com.tcc2022.techmedicine.payload.request.SignupRequest;
import com.tcc2022.techmedicine.payload.response.JwtResponse;
import com.tcc2022.techmedicine.payload.response.MessageResponse;
import com.tcc2022.techmedicine.repositories.PermissionRepository;
import com.tcc2022.techmedicine.repositories.UserRepository;
import com.tcc2022.techmedicine.security.jwt.JwtUtils;
import com.tcc2022.techmedicine.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping()
public class AuthResource {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PermissionRepository permissaoRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUser(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();		
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		return ResponseEntity.ok(new JwtResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(), 
												 roles));
	}
	
	@PostMapping("/cadastrar")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUser())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		// Create new user's account
		User user = new User(null,
							 signUpRequest.getUser(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));
		Set<String> strPermissions = signUpRequest.getPermissions();
		Set<Permission> permissions = new HashSet<>();
		if (strPermissions == null) {
			Permission permission = permissaoRepository.findByDescription("ROLE_FUNCIONARIO")
					.orElseThrow(() -> new RuntimeException("Error: Permission is not found."));
			permissions.add(permission);
		} else {
			strPermissions.forEach(perm -> {
				Permission permission = permissaoRepository.findByDescription(perm)
						.orElseThrow(() -> new RuntimeException("Error: Permission is not found."));
				permissions.add(permission);
			});
		}
		user.setPermissions(permissions);
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
