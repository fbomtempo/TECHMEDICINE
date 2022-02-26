package com.tcc2022.techmedicine.entities.enums;

public enum SituacaoAtendimento {

	ABERTO("ABERTO"),
	FINALIZADO("FINALIZADO"),
	CANCELADO("CANCELADO");
	
	private String code;
	
	private SituacaoAtendimento(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
}
