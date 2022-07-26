package com.tcc2022.techmedicine.entities.enums;

public enum AccessPermission {
	
	FUNCIONARIO("FUNCIONARIO"),
    ADMIN("ADMIN");
	
	private String code;
	
	private AccessPermission(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
