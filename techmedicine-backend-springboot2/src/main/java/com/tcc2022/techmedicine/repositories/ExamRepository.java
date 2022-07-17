package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {

	List<Exam> findAllByOrderByIdDesc();
}
