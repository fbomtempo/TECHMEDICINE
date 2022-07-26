package com.tcc2022.techmedicine.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;

@ControllerAdvice
public class Handler {

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<ExceptionDetails> notFound(NotFoundException e, HttpServletRequest request) {
		Instant instant = Instant.now();
		Integer status = HttpStatus.NOT_FOUND.value();
		String error = "Dado não encontrado";
		String message = e.getMessage();
		String path = request.getRequestURI();
		ExceptionDetails exception = new ExceptionDetails(instant, status, error, message, path); 
		return ResponseEntity.status(status).body(exception);
	}
	
	@ExceptionHandler(DatabaseException.class)
	public ResponseEntity<ExceptionDetails> database(DatabaseException e, HttpServletRequest request) {
		Instant instant = Instant.now();
		Integer status = HttpStatus.BAD_REQUEST.value();
		String error = "Erro no banco de dados";
		String message = e.getMessage();
		String path = request.getRequestURI();
		ExceptionDetails exception = new ExceptionDetails(instant, status, error, message, path); 
		return ResponseEntity.status(status).body(exception);
	}
}
