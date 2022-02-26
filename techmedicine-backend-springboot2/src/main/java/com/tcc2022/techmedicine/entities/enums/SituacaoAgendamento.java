package com.tcc2022.techmedicine.entities.enums;

public enum SituacaoAgendamento {

	AGENDADO("AGENDADO"),
	ATENDIDO("ATENDIDO"),
	CANCELADO("CANCELADO");
	
	private String code;
	
	private SituacaoAgendamento(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
	
}
