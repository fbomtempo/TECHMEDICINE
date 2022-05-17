package com.tcc2022.techmedicine.payload.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class SignupRequest {
	
	@NotBlank
	@Size(min = 3, max = 20)
	private String user;

	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	private Set<String> permissions;

	@NotBlank
	@Size(min = 6, max = 40)
	private String password;

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<String> getPermissions() {
		return this.permissions;
	}

	public void setPermissions(Set<String> permissions) {
		this.permissions = permissions;
	}
}