package com.tcc2022.techmedicine.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends  ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers("/usuarios/**").hasRole("ADMIN")
				.antMatchers("/permissoes/**").hasRole("ADMIN")
				.antMatchers("/pacientes/**").hasAnyRole("ADMIN", "MEDICO", "FUNCIONARIO")
				.antMatchers("/funcionarios/**").hasAnyRole("ADMIN", "FUNCIONARIO")
				.antMatchers("/cargos/**").hasAnyRole("ADMIN", "FUNCIONARIO")
				.antMatchers("/especialidades/**").hasAnyRole("ADMIN", "FUNCIONARIO")
				.antMatchers("/agendamentos/**").hasAnyRole("ADMIN", "FUNCIONARIO")
				.antMatchers("/doencas/**").hasAnyRole("ADMIN", "MEDICO", "FUNCIONARIO")
				.antMatchers("/medicos/**").hasAnyRole("ADMIN", "MEDICO", "FUNCIONARIO")
				.antMatchers("/cabecalhos-atendimento/**").hasAnyRole("ADMIN", "MEDICO",  "FUNCIONARIO")
				.antMatchers("/atendimentos/**").hasAnyRole("ADMIN", "MEDICO", "FUNCIONARIO");
	}
	
}
