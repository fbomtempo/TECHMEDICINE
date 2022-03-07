package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_medico")
public class Medico implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 20, nullable = false)
	private String nome;
	
	@Column(length = 50, nullable = false)
	private String sobrenome;
	
	@Column(length = 50, nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date nascimento;
	
	@Column(length = 9, nullable = false)
	private String sexo;

	@ManyToOne
	@JoinColumn(name = "id_especialidade", nullable = false)
	private Especialidade especialidade;
	
	@Column(length = 8, nullable = false)
	private String crm;
	
	@Column(length = 12, nullable = false)
	private String rg;
	
	@Column(length = 11, unique = true)
	private String cpf;
	
	@Column(length = 10, nullable = true)
	private String telefoneResidencial;
	
	@Column(length = 11, nullable = false)
	private String telefoneCelular;
	
	@Column(length = 35, nullable = false)
	private String email;
	
	@Column(length = 8, nullable = false)
	private String cep;
	
	@Column(length = 30, nullable = false)
	private String cidade;
	
	@Column(length = 2, nullable = false)
	private String estado;
	
	@Column(length = 70, nullable = false)
	private String endereco;
	
	@Column(length = 5, nullable = false)
	private String numero;
	
	@Column(length = 30, nullable = false)
	private String bairro;
	
	@Column(length = 70, nullable = true)
	private String complemento;
	
	@OneToMany(mappedBy = "medico")
	@JsonIgnore
	Set<Agendamento> agendamentos = new HashSet<>();
	
	public Medico() {
	}

	public Medico(Long id, String nome, String sobrenome, Date nascimento, String sexo, String crm, Especialidade especialidade, 
			String rg, String cpf, String telefoneResidencial, String telefoneCelular, String email, String cep, String cidade, 
			String estado, String endereco, String numero, String bairro, String complemento) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.nascimento = nascimento;
		this.sexo = sexo;
		this.crm = crm;
		this.especialidade = especialidade;
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

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
	}

	public Especialidade getEspecialidade() {
		return especialidade;
	}

	public void setEspecialidade(Especialidade especialidade) {
		this.especialidade = especialidade;
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

	public void setTelefoneResidencial(String testeTelRes) {
		this.telefoneResidencial = testeTelRes;
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

	public Set<Agendamento> getAgendamentos() {
		return agendamentos;
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
		Medico other = (Medico) obj;
		return Objects.equals(id, other.id);
	}
}