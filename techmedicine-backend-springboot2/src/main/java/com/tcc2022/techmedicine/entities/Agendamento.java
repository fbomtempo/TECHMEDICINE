package com.tcc2022.techmedicine.entities;

import java.io.Serializable;
import java.util.Date;
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
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tcc2022.techmedicine.entities.enums.SituacaoAgendamento;

@Entity
@Table(name = "tb_agendamento")
public class Agendamento implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_paciente", nullable = false)
	private Paciente paciente;
	
	@ManyToOne
	@JoinColumn(name = "id_medico", nullable = false)
	private Medico medico;
	
	@Column(length = 50, nullable = false)
	@JsonFormat(pattern = "dd/MM/yyyy", timezone = "America/Sao_Paulo")
	private Date dataAgendamento;
	
	@Column(length = 50, nullable = false, unique = true)
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm", timezone = "America/Sao_Paulo")
	private Date dataAgendada;
	
	private Integer situacaoAgendamento;
	
	@OneToOne(mappedBy = "agendamento")
	@JsonIgnore
	private Atendimento atendimento;
	
	public Agendamento() {
	}

	public Agendamento(Long id, Paciente paciente, Medico medico, Date dataAgendamento, Date dataAgendada, SituacaoAgendamento situacaoAgendamento) {
		this.id = id;
		this.paciente = paciente;
		this.medico = medico;
		this.dataAgendamento = dataAgendamento;
		this.dataAgendada = dataAgendada;
		setSituacaoAgendamento(situacaoAgendamento);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public Medico getMedico() {
		return medico;
	}

	public void setMedico(Medico medico) {
		this.medico = medico;
	}

	public Date getDataAgendamento() {
		return dataAgendamento;
	}

	public void setDataAgendamento(Date dataAgendamento) {
		this.dataAgendamento = dataAgendamento;
	}

	public Date getDataAgendada() {
		return dataAgendada;
	}

	public void setDataAgendada(Date dataAgendada) {
		this.dataAgendada = dataAgendada;
	}

	public SituacaoAgendamento getSituacaoAgendamento() {
		return SituacaoAgendamento.valueOf(situacaoAgendamento);
	}
	
	public void setSituacaoAgendamento(SituacaoAgendamento situacaoAgendamento) {
		if (situacaoAgendamento != null) {
			this.situacaoAgendamento = situacaoAgendamento.getCode();
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
		Agendamento other = (Agendamento) obj;
		return Objects.equals(id, other.id);
	}
}
