package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.AttendanceHeader;
import com.tcc2022.techmedicine.repositories.AttendanceHeaderRepository;

@Service
public class AttendanceHeaderService {

	@Autowired
	private AttendanceHeaderRepository attendanceHeaderRepository;
	
	public List<AttendanceHeader> findAll() {
		return attendanceHeaderRepository.findAll();
	}
	
	public AttendanceHeader findById(Long id) {
		Optional<AttendanceHeader> obj = attendanceHeaderRepository.findById(id);
		return obj.get();
	}
	
	public AttendanceHeader insert(AttendanceHeader obj) {
		return attendanceHeaderRepository.save(obj);
	}
	
	public void delete(Long id) {
		attendanceHeaderRepository.deleteById(id);
	}
	
	public AttendanceHeader update(Long id, AttendanceHeader obj) {
		AttendanceHeader medicalAtentionHeader = attendanceHeaderRepository.findById(id).get();
		updateData(medicalAtentionHeader, obj);
		return attendanceHeaderRepository.save(medicalAtentionHeader);
	}
	
	private void updateData(AttendanceHeader medicalAtentionHeader, AttendanceHeader obj) {
		medicalAtentionHeader.setPatient(obj.getPatient());
		medicalAtentionHeader.setMedic(obj.getMedic());
		medicalAtentionHeader.setAttendanceDate(obj.getAttendanceDate());
		medicalAtentionHeader.setAttendanceSituation(obj.getAttendanceSituation());
	}
}
