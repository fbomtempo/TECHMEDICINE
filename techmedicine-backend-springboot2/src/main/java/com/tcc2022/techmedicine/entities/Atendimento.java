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

import com.tcc2022.techmedicine.entities.enums.SituacaoAtendimento;

@Entity
@Table(name = "tb_atendimento")
public class Atendimento implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne
	@JoinColumn(name = "id_agendamento", nullable = true, unique = true )
	private Agendamento agendamento;
	
	@ManyToOne
	@JoinColumn(name = "id_paciente", nullable = false)
	private Paciente paciente;
	
	@ManyToOne
	@JoinColumn(name = "id_medico", nullable = false)
	private Medico medico;
	
	@Column(nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataAtendimento;
	
	private String situacaoAtendimento;
	
	public Atendimento() {
	}

	public Atendimento(Long id, Agendamento agendamento, Paciente paciente, Medico medico, LocalDate dataAtendimento, SituacaoAtendimento situacaoAtendimento) {
		this.id = id;
		this.agendamento = agendamento;
		this.paciente = paciente;
		this.medico = medico;
		this.dataAtendimento = dataAtendimento;
		setSituacaoAtendimento(situacaoAtendimento);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Agendamento getAgendamento() {
		return agendamento;
	}

	public void setAgendamento(Agendamento agendamento) {
		this.agendamento = agendamento;
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

	public LocalDate getDataAtendimento() {
		return dataAtendimento;
	}

	public void setDataAtendimento(LocalDate dataAtendimento) {
		this.dataAtendimento = dataAtendimento;
	}

	public SituacaoAtendimento getSituacaoAtendimento() {
		return SituacaoAtendimento.valueOf(situacaoAtendimento);
	}
	
	public void setSituacaoAtendimento(SituacaoAtendimento situacaoAtendimento) {
		if (situacaoAtendimento != null) {
			this.situacaoAtendimento = situacaoAtendimento.getCode();
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
		Atendimento other = (Atendimento) obj;
		return Objects.equals(id, other.id);
	}
}
