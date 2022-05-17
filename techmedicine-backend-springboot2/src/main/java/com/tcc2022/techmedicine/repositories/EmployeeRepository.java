package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	List<Employee> findAllByOrderByIdDesc();

}
