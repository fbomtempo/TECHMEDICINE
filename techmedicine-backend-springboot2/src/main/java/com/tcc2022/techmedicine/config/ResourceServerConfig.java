package com.tcc2022.techmedicine.config;

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
				.antMatchers("/usuarios/**").permitAll()
				.antMatchers("/pacientes/**").hasRole("FUNCIONARIO")
				.antMatchers("/medicos/**").permitAll()
				.anyRequest().hasRole("ADMIN");
		/*http
			.authorizeRequests()
				.anyRequest().permitAll();*/
	}
	
}
