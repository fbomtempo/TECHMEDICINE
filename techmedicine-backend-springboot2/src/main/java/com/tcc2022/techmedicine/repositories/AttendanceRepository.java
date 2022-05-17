package com.tcc2022.techmedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

}
