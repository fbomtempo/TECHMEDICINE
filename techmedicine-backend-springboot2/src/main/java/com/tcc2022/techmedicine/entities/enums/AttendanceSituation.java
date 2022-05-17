package com.tcc2022.techmedicine.entities.enums;

public enum AttendanceSituation {

	ABERTO("ABERTO"),
	FINALIZADO("FINALIZADO"),
	CANCELADO("CANCELADO");
	
	private String code;
	
	private AttendanceSituation(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
