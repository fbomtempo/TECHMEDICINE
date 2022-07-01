package com.tcc2022.techmedicine.exceptions.exception;

public class DatabaseException extends RuntimeException {
	static final long serialVersionUID = 1L;
	
	public DatabaseException(String message) {
		super(message);
	}
}
