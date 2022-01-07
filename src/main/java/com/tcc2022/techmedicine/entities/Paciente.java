package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_paciente")
public class Paciente implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Column(length = 20)
	private String nome;
	
	@NotNull
	@Column(length = 50)
	private String sobrenome;
	
	@NotNull
	@Column(length = 50)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private Date nascimento;
	
	@NotNull
	@Column(length = 9)
	private String sexo;
	
	@NotNull
	@Column(length = 12)
	private String rg;
	
	@NotNull
	@Column(length = 14, unique = true)
	private String cpf;
	
	@Column(length = 14)
	private String telefoneResidencial;
	
	@NotNull
	@Column(length = 15)
	private String telefoneCelular;
	
	@NotNull
	@Column(length = 35)
	private String email;
	
	@NotNull
	@Column(length = 50)
	private String cep;
	
	@NotNull
	@Column(length = 30)
	private String cidade;
	
	@NotNull
	@Column(length = 2)
	private String estado;
	
	@NotNull
	@Column(length = 70)
	private String endereco;
	
	@NotNull
	@Column(length = 5)
	private String numero;
	
	@NotNull
	@Column(length = 30)
	private String bairro;
	
	@Column(length = 70)
	private String complemento;
	
	public Paciente() {
	}

	public Paciente(Long id, @NotNull String nome, @NotNull String sobrenome, @NotNull Date nascimento,
			@NotNull String sexo, @NotNull String rg, @NotNull String cpf, String telefoneResidencial,
			@NotNull String telefoneCelular, @NotNull String email, @NotNull String cep, @NotNull String cidade,
			@NotNull String estado, @NotNull String endereco, @NotNull String numero, @NotNull String bairro,
			String complemento) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.nascimento = nascimento;
		this.sexo = sexo;
		this.rg = rg;
		this.cpf = cpf;
		this.telefoneResidencial = telefoneResidencial;
		this.telefoneCelular = telefoneCelular;
		this.email = email;
		this.cep = cep;
		this.cidade = cidade;
		this.estado = estado;
		this.endereco = endereco;
		this.numero = numero;
		this.bairro = bairro;
		this.complemento = complemento;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	public Date getNascimento() {
		return nascimento;
	}

	public void setNascimento(Date nascimento) {
		this.nascimento = nascimento;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefoneResidencial() {
		return telefoneResidencial;
	}

	public void setTelefoneResidencial(String telefoneResidencial) {
		this.telefoneResidencial = telefoneResidencial;
	}

	public String getTelefoneCelular() {
		return telefoneCelular;
	}

	public void setTelefoneCelular(String telefoneCelular) {
		this.telefoneCelular = telefoneCelular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Paciente other = (Paciente) obj;
		return Objects.equals(id, other.id);
	}
}