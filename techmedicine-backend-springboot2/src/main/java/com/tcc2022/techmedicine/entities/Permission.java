package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.tcc2022.techmedicine.entities.enums.AccessPermission;

@Entity
@Table(name = "tb_permission")
public class Permission implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 20, nullable = false)
	private String description;
	
	public Permission() {
	}
	
	public Permission(Long id, AccessPermission description) {
		this.id = id;
		setDescription(description);
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public AccessPermission getDescription() {
		return AccessPermission.valueOf(description);
	}
	
	public void setDescription(AccessPermission description) {
		if (description != null) {
			this.description = description.getCode();
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
		Permission other = (Permission) obj;
		return Objects.equals(id, other.id);
	}
}
