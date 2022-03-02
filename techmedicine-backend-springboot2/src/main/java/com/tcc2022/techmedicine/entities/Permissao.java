package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tcc2022.techmedicine.entities.enums.PermissaoAcesso;

@Entity
@Table(name = "tb_permissao")
public class Permissao implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 20, nullable = false)
	private String descricao;
	
	public Permissao() {
	}
	
	public Permissao(Long id, PermissaoAcesso descricao) {
		this.id = id;
		setDescricao(descricao);
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public PermissaoAcesso getDescricao() {
		return PermissaoAcesso.valueOf(descricao);
	}
	
	public void setDescricao(PermissaoAcesso descricao) {
		if (descricao != null) {
			this.descricao = descricao.getCode();
		}
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
		Permissao other = (Permissao) obj;
		return Objects.equals(id, other.id);
	}
}
