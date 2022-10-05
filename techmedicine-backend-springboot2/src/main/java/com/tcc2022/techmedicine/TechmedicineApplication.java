package com.tcc2022.techmedicine;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication()
public class TechmedicineApplication {
	public static void main(String[] args) {
		SpringApplication.run(TechmedicineApplication.class, args);
	}
	
    @PostConstruct
    public void init() {
      TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
    }
}
