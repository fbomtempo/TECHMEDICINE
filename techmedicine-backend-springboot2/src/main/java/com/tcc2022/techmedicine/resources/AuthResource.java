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

import com.tcc2022.techmedicine.entities.Permissao;
import com.tcc2022.techmedicine.entities.Usuario;
import com.tcc2022.techmedicine.entities.enums.PermissaoAcesso;
import com.tcc2022.techmedicine.payload.request.LoginRequest;
import com.tcc2022.techmedicine.payload.request.SignupRequest;
import com.tcc2022.techmedicine.payload.response.JwtResponse;
import com.tcc2022.techmedicine.payload.response.MessageResponse;
import com.tcc2022.techmedicine.repositories.PermissaoRepository;
import com.tcc2022.techmedicine.repositories.UsuarioRepository;
import com.tcc2022.techmedicine.security.jwt.JwtUtils;
import com.tcc2022.techmedicine.security.services.DetalheUsuarioImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping()
public class AuthResource {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	PermissaoRepository permissaoRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUsuario(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsuario(), loginRequest.getSenha()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		DetalheUsuarioImpl userDetails = (DetalheUsuarioImpl) authentication.getPrincipal();		
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
	public ResponseEntity<?> registerUsuario(@Valid @RequestBody SignupRequest signUpRequest) {
		if (usuarioRepository.existsByUsuario(signUpRequest.getUsuario())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Usuarioname is already taken!"));
		}
		if (usuarioRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		// Create new user's account
		Usuario user = new Usuario(null,
							 signUpRequest.getUsuario(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getSenha()));
		Set<String> strPermissoes = signUpRequest.getPermissoes();
		Set<Permissao> permissoes = new HashSet<>();
		if (strPermissoes == null) {
			Permissao userCargo = permissaoRepository.findByDescricao("ROLE_FUNCIONARIO")
					.orElseThrow(() -> new RuntimeException("Error: Permission is not found."));
			permissoes.add(userCargo);
		} else {
			strPermissoes.forEach(perm -> {
				Permissao permissao = permissaoRepository.findByDescricao(perm)
						.orElseThrow(() -> new RuntimeException("Error: Permission is not found."));
				permissoes.add(permissao);
			});
		}
		user.setPermissoes(permissoes);
		usuarioRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("Usuario registered successfully!"));
	}
}
