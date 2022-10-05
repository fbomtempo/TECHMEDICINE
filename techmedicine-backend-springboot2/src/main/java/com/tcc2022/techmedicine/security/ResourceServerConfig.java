package com.tcc2022.techmedicine.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends  ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		/*http
			.authorizeRequests()
				// ADMIN
				.antMatchers("/usuarios/**").hasRole("ADMIN")
				.antMatchers("/permissoes/**").hasRole("ADMIN")
				// MEDICO
				.antMatchers(HttpMethod.GET, "/pacientes/**").hasAnyRole("ADMIN", "MEDICO", "RECEPCIONISTA")
				.antMatchers(HttpMethod.GET, "/medicos/**").hasAnyRole("ADMIN", "MEDICO", "ASSISTENTE_ADM", "RECEPCIONISTA")
				.antMatchers(HttpMethod.GET, "/doencas/**").hasAnyRole("ADMIN", "MEDICO", "ASSISTENTE_ADM")
				// ASSISTENTE_ADM
				.antMatchers("/medicos/**").hasAnyRole("ADMIN", "ASSISTENTE_ADM")
				.antMatchers("/funcionarios/**").hasAnyRole("ADMIN", "ASSISTENTE_ADM")
				.antMatchers("/especialidades/**").hasAnyRole("ADMIN", "ASSISTENTE_ADM")
				.antMatchers("/cargos/**").hasAnyRole("ADMIN", "ASSISTENTE_ADM")
				.antMatchers("/doencas/**").hasAnyRole("ADMIN", "ASSISTENTE_ADM")
				.antMatchers(HttpMethod.GET, "/agendamentos/**").hasAnyRole("ADMIN", "MEDICO", "ASSISTENTE_ADM", "RECEPCIONISTA")
				.antMatchers(HttpMethod.GET, "/atendimentos/**").hasAnyRole("ADMIN", "MEDICO", "ASSISTENTE_ADM", "RECEPCIONISTA")
				// RECEPCIONISTA
				.antMatchers("/pacientes/**").hasAnyRole("ADMIN", "RECEPCIONISTA")
				.antMatchers("/agendamentos/**").hasAnyRole("ADMIN", "RECEPCIONISTA")
				.antMatchers("/cabecalhos-atendimento/**").hasAnyRole("ADMIN", "MEDICO", "RECEPCIONISTA");*/
		http
			.authorizeRequests()
				.anyRequest().permitAll();
	}	
}
