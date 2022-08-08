package com.tcc2022.techmedicine.entities.enums;

public enum AccessPermission {
	
	ADMIN("ADMIN"),
	MEDICO("MEDICO"),
	ASSISTENTE_ADM("ASSISTENTE_ADM"),
    RECEPCIONISTA("RECEPCIONISTA");
	
	private String code;
	
	private AccessPermission(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
