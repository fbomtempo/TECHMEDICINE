package com.tcc2022.techmedicine.payload.response;

import java.util.List;

public class JwtResponse {
	
	private String token;
	private String type = "Bearer";
	private Long id;
	private String user;
	private String email;
	private List<String> permissions;

	public JwtResponse(String accessToken, Long id, String user, String email, List<String> permissions) {
		this.token = accessToken;
		this.id = id;
		this.user = user;
		this.email = email;
		this.permissions = permissions;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public List<String> getPermissions() {
		return permissions;
	}
}