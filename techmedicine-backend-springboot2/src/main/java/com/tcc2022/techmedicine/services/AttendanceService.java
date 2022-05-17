package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Attendance;
import com.tcc2022.techmedicine.repositories.AttendanceRepository;

@Service
public class AttendanceService {

	@Autowired
	private AttendanceRepository attendanceRepository;
	
	public List<Attendance> findAll() {
		return attendanceRepository.findAll();
	}
	
	public Attendance findById(Long id) {
		Optional<Attendance> obj = attendanceRepository.findById(id);
		return obj.get();
	}
	
	public Attendance insert(Attendance obj) {
		return attendanceRepository.save(obj);
	}
	
	public void delete(Long id) {
		attendanceRepository.deleteById(id);
	}
	
	public Attendance update(Long id, Attendance obj) {
		Attendance attendance = attendanceRepository.findById(id).get();
		updateData(attendance, obj);
		return attendanceRepository.save(attendance);
	}
	
	private void updateData(Attendance attendance, Attendance obj) {
		attendance.setPatient(obj.getPatient());
		attendance.setMedic(obj.getMedic());
		attendance.setAttendanceDate(obj.getAttendanceDate());
		attendance.setAttendanceSituation(obj.getAttendanceSituation());
	}
}
