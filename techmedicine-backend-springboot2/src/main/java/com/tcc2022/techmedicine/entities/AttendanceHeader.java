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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.tcc2022.techmedicine.entities.enums.AttendanceSituation;

@Entity
@Table(name = "tb_attendance_header")
public class AttendanceHeader implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "appointment_id", nullable = true, unique = true )
	private Appointment appointment;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", nullable = false)
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name = "medic_id", nullable = false)
	private Medic medic;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate attendanceDate;
	
	private String attendanceSituation;
	
	public AttendanceHeader() {
	}

	public AttendanceHeader(Long id, Appointment appointment, Patient patient, Medic medic, LocalDate attendanceDate, AttendanceSituation attendanceSituation) {
		this.id = id;
		this.appointment = appointment;
		this.patient = patient;
		this.medic = medic;
		this.attendanceDate = attendanceDate;
		setAttendanceSituation(attendanceSituation);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Appointment getAttendance() {
		return appointment;
	}

	public void setAttendance(Appointment appointment) {
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

	public LocalDate getAttendanceDate() {
		return attendanceDate;
	}

	public void setAttendanceDate(LocalDate attendanceDate) {
		this.attendanceDate = attendanceDate;
	}

	public AttendanceSituation getAttendanceSituation() {
		return AttendanceSituation.valueOf(attendanceSituation);
	}
	
	public void setAttendanceSituation(AttendanceSituation attendanceSituation) {
		if (attendanceSituation != null) {
			this.attendanceSituation = attendanceSituation.getCode();
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
		AttendanceHeader other = (AttendanceHeader) obj;
		return Objects.equals(id, other.id);
	}
}