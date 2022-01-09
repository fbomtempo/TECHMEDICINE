package com.tcc2022.techmedicine.entities.enums;

public enum SituacaoAgendamento {

	AGENDADO(1),
	ATENDIDO(2),
	CANCELADO(3);
	
	private int code;
	
	private SituacaoAgendamento(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
	public static SituacaoAgendamento valueOf(int code) {
		for (SituacaoAgendamento value : SituacaoAgendamento.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Código inválido");
	}
}
