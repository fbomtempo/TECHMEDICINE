package com.tcc2022.techmedicine.entities.enums;

public enum SituacaoAtendimento {

	ABERTO(1),
	FINALIZADO(2),
	CANCELADO(3);
	
	private int code;
	
	private SituacaoAtendimento(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
	public static SituacaoAtendimento valueOf(int code) {
		for (SituacaoAtendimento value: SituacaoAtendimento.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Código inválido");
	}
}
