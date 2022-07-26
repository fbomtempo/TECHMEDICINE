package com.tcc2022.techmedicine.exceptions.custom;

public class DatabaseException extends RuntimeException {
	static final long serialVersionUID = 1L;
	
	public DatabaseException(String message) {
		super(message);
	}
}
