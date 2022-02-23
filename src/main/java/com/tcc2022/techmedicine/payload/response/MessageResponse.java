package com.tcc2022.techmedicine.payload.response;

public class MessageResponse {
	
	private String mensagem;

	public MessageResponse(String mensagem) {
		this.mensagem = mensagem;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}
}