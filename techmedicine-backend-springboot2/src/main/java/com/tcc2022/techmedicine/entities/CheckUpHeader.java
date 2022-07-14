package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tcc2022.techmedicine.entities.enums.CheckUpSituation;

@Entity
@Table(name = "tb_checkup_header")
public class CheckUpHeader implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "appointment_id", nullable = true)
	private Appointment appointment;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "medic_id", nullable = false)
	private Medic medic;
	
	@Column(nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
	
	@Column(nullable = false)
	@JsonFormat(pattern = "HH:mm")
	private LocalTime startTime;
	
	@Column(nullable = true)
	@JsonFormat(pattern = "HH:mm")
	private LocalTime endTime;
	
	private String checkUpSituation;
	
	public CheckUpHeader() {
	}

	public CheckUpHeader(Long id, Appointment appointment, Patient patient, Medic medic, LocalDate date, LocalTime startTime, LocalTime endTime, CheckUpSituation checkUpSituation) {
		this.id = id;
		this.appointment = appointment;
		this.patient = patient;
		this.medic = medic;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		setCheckUpSituation(checkUpSituation);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Appointment getAppointment() {
		return appointment;
	}

	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Medic getMedic() {
		return medic;
	}

	public void setMedic(Medic medic) {
		this.medic = medic;
	}
	
	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public CheckUpSituation getCheckUpSituation() {
		return CheckUpSituation.valueOf(checkUpSituation);
	}
	
	public void setCheckUpSituation(CheckUpSituation checkUpSituation) {
		if (checkUpSituation != null) {
			this.checkUpSituation = checkUpSituation.getCode();
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
		CheckUpHeader other = (CheckUpHeader) obj;
		return Objects.equals(id, other.id);
	}
}