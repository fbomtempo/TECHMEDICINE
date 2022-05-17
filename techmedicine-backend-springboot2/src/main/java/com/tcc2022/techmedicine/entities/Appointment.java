package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.tcc2022.techmedicine.entities.enums.AppointmentSituation;

@Entity
@Table(name = "tb_appointment")
public class Appointment implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "medic_id", nullable = false)
	private Medic medic;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime scheduledTimestamp;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime endTimestamp;
	
	@Column(length = 30, nullable = false)
	private String appointmentSituation;
	
	public Appointment() {
	}

	public Appointment(Long id, Patient patient, Medic medic, LocalDateTime scheduledTimestamp, LocalDateTime endTimestamp, AppointmentSituation appointmentSituation) {
		this.id = id;
		this.patient = patient;
		this.medic = medic;
		this.scheduledTimestamp = scheduledTimestamp;
		this.endTimestamp = endTimestamp;
		setAppointmentSituation(appointmentSituation);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public LocalDateTime getScheduledTimestamp() {
		return scheduledTimestamp;
	}

	public void setScheduledTimestamp(LocalDateTime scheduledTimestamp) {
		this.scheduledTimestamp = scheduledTimestamp;
	}
	
	public LocalDateTime getEndTimestamp() {
		return endTimestamp;
	}

	public void setEndTimestamp(LocalDateTime endTimestamp) {
		this.endTimestamp = endTimestamp;
	}

	public AppointmentSituation getAppointmentSituation() {
		return AppointmentSituation.valueOf(appointmentSituation);
	}
	
	public void setAppointmentSituation(AppointmentSituation appointmentSituation) {
		if (appointmentSituation != null) {
			this.appointmentSituation = appointmentSituation.getCode();
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
		Appointment other = (Appointment) obj;
		return Objects.equals(id, other.id);
	}
}
