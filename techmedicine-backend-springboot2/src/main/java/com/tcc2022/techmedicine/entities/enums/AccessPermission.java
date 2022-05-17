package com.tcc2022.techmedicine.entities.enums;

public enum AccessPermission {
	
	ROLE_FUNCIONARIO("ROLE_FUNCIONARIO"),
    ROLE_MEDICO("ROLE_MEDICO"),
    ROLE_ADMIN("ROLE_ADMIN");
	
	private String code;
	
	private AccessPermission(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
