package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tb_medic")
public class Medic implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 20, nullable = false)
	private String name;
	
	@Column(length = 50, nullable = false)
	private String surname;
	
	@Column(nullable = false)
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate birthDate;
	
	@Column(length = 9, nullable = false)
	private String gender;
	
	@ManyToOne
	@JoinColumn(name = "specialty_id", nullable = false)
	private Specialty specialty;
	
	@Column(length = 8, nullable = false)
	private String crm;
	
	@Column(length = 12, nullable = false)
	private String rg;
	
	@Column(length = 14, unique = true, nullable = false)
	private String cpf;
	
	@Column(length = 14, nullable = true)
	private String homePhone;
	
	@Column(length = 15, nullable = false)
	private String mobilePhone;
	
	@Column(length = 35, nullable = false)
	private String email;
	
	@Column(length = 50, nullable = false)
	private String cep;
	
	@Column(length = 30, nullable = false)
	private String city;
	
	@Column(length = 2, nullable = false)
	private String state;
	
	@Column(length = 70, nullable = false)
	private String address;
	
	@Column(length = 5, nullable = false)
	private String number;
	
	@Column(length = 30, nullable = false)
	private String district;
	
	@Column(length = 70, nullable = true)
	private String complement;

	public Medic() {
	}

	public Medic(Long id, String name, String sobrename, LocalDate birthDate, String gender, Specialty specialty, String crm,
			String rg, String cpf, String telefoneResidencial, String mobilePhone, String email, String cep,String city, String state, 
			String address, String number, String district, String complement) {
		this.id = id;
		this.name = name;
		this.surname = sobrename;
		this.birthDate = birthDate;
		this.gender = gender;
		this.specialty = specialty;
		this.crm = crm;
		this.rg = rg;
		this.cpf = cpf;
		this.homePhone = telefoneResidencial;
		this.mobilePhone = mobilePhone;
		this.email = email;
		this.cep = cep;
		this.city = city;
		this.state = state;
		this.address = address;
		this.number = number;
		this.district = district;
		this.complement = complement;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String sobrename) {
		this.surname = sobrename;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Specialty getSpecialty() {
		return specialty;
	}

	public void setSpecialty(Specialty specialty) {
		this.specialty = specialty;
	}

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
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

	public String getHomePhone() {
		return homePhone;
	}

	public void setHomePhone(String telefoneResidencial) {
		this.homePhone = telefoneResidencial;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
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

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getComplement() {
		return complement;
	}

	public void setComplement(String complement) {
		this.complement = complement;
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
		Medic other = (Medic) obj;
		return Objects.equals(id, other.id);
	}
}