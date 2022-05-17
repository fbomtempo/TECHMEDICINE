package com.tcc2022.techmedicine.entities.enums;

public enum AppointmentSituation {

	AGENDADO("AGENDADO"),
	ATENDIDO("ATENDIDO"),
	CANCELADO("CANCELADO");
	
	private String code;
	
	private AppointmentSituation(String code) {
		this.code = code;
	}
	
	public String getCode() {
		return code;
	}
	
}
