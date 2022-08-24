package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.tcc2022.techmedicine.entities.enums.CheckUpSituation;

@Entity
@Table(name = "tb_checkup")
public class CheckUp implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "checkup_header_id", nullable = false, unique = true)
	private CheckUpHeader checkUpHeader;
	
	@Column(length = 500, nullable = false)
	private String complaint;
	
	@Column(length = 500, nullable = false)
	private String diseaseHistory;
	
	@Column(length = 500, nullable = false)
	private String familyHistory;
	
	@Column(length = 500, nullable = false)
	private String patientHistory;
	
	@OneToOne
	@JoinColumn(name = "disease_id")
	private Disease disease;
	
	@Column(length = 500, nullable = false)
	private String conduct;
	
	@Column(length = 500, nullable = true)
	private String prescription;
	
	@Column(length = 500, nullable = true)
	private String exams;
	
	@Column(nullable = false)
	private String checkUpSituation;
	
	public CheckUp() {
	}

	public CheckUp(Long id, CheckUpHeader checkUpHeader, String complaint, String diseaseHistory, String familyHistory,
			String patientHistory, Disease disease, String conduct, String prescription, String exams, CheckUpSituation checkUpSituation) {
		super();
		this.id = id;
		this.checkUpHeader = checkUpHeader;
		this.complaint = complaint;
		this.diseaseHistory = diseaseHistory;
		this.familyHistory = familyHistory;
		this.patientHistory = patientHistory;
		this.disease = disease;
		this.conduct = conduct;
		this.prescription = prescription;
		this.exams = exams;
		setCheckUpSituation(checkUpSituation);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public CheckUpHeader getCheckUpHeader() {
		return checkUpHeader;
	}

	public void setCheckUpHeader(CheckUpHeader checkUpHeader) {
		this.checkUpHeader = checkUpHeader;
	}

	public String getComplaint() {
		return complaint;
	}

	public void setComplaint(String complaint) {
		this.complaint = complaint;
	}
	
	public String getDiseaseHistory() {
		return diseaseHistory;
	}

	public void setDiseaseHistory(String diseaseHistory) {
		this.diseaseHistory = diseaseHistory;
	}

	public String getFamilyHistory() {
		return familyHistory;
	}

	public void setFamilyHistory(String familyHistory) {
		this.familyHistory = familyHistory;
	}

	public String getPatientHistory() {
		return patientHistory;
	}

	public void setPatientHistory(String patientHistory) {
		this.patientHistory = patientHistory;
	}

	public Disease getDisease() {
		return disease;
	}

	public void setDisease(Disease disease) {
		this.disease = disease;
	}

	public String getConduct() {
		return conduct;
	}

	public void setConduct(String conduct) {
		this.conduct = conduct;
	}

	public String getPrescription() {
		return prescription;
	}

	public void setPrescription(String prescription) {
		this.prescription = prescription;
	}

	public String getExams() {
		return exams;
	}

	public void setExams(String exams) {
		this.exams = exams;
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
		CheckUp other = (CheckUp) obj;
		return Objects.equals(id, other.id);
	}
}
