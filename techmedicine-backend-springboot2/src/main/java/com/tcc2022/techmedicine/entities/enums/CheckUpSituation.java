package com.tcc2022.techmedicine.entities.enums;

public enum CheckUpSituation {

	ABERTO("ABERTO"),
	FINALIZADO("FINALIZADO"),
	CANCELADO("CANCELADO");
	
	private String code;
	
	private CheckUpSituation(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
