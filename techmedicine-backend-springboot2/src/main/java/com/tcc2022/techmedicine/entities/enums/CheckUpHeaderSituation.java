package com.tcc2022.techmedicine.entities.enums;

public enum CheckUpHeaderSituation {

	ABERTO("ABERTO"),
	EM_ATENDIMENTO("EM ATENDIMENTO"),
	FINALIZADO("FINALIZADO"),
	CANCELADO("CANCELADO");
	
	private String code;
	
	private CheckUpHeaderSituation(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
