package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Employee;
import com.tcc2022.techmedicine.exceptions.custom.DatabaseException;
import com.tcc2022.techmedicine.exceptions.custom.NotFoundException;
import com.tcc2022.techmedicine.repositories.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	public List<Employee> findAll(Sort sort) {
		return employeeRepository.findAll(sort);
	}
	
	public Page<Employee> findAll(Pageable pageable, String filter) {
		if (filter.isBlank()) {
			return this.employeeRepository.findAll(pageable);
		}
		return this.employeeRepository.findEmployeesByFilter(pageable, filter);
	}
	
	public Employee findById(Long id) {
		try {
			return employeeRepository.findById(id).get();
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Funcionário de id " + id + " não existe");
		}
	}

	public Employee insert(Employee obj) {
		try {
			return employeeRepository.save(obj);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	public void delete(Long id) {
		try {
			employeeRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new NotFoundException("Funcionário de id " + id + " não existe");
		}
	}
	
	public Employee update(Long id, Employee obj) {
		try {
			Employee employee = employeeRepository.findById(id).get();
			updateData(employee, obj);
			return employeeRepository.save(employee);
		} catch (NoSuchElementException e) {
			throw new NotFoundException("Funcionário de id " + id + " não existe");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação na integridade ou validações dos campos do banco");
		}
	}
	
	private void updateData(Employee employee, Employee obj) {
		employee.setName(obj.getName());
		employee.setSurname(obj.getSurname());
		employee.setBirthDate(obj.getBirthDate());
		employee.setGender(obj.getGender());
		employee.setRole(obj.getRole());
		employee.setRg(obj.getRg());
		employee.setCpf(obj.getCpf());
		employee.setHomePhone(obj.getHomePhone());
		employee.setMobilePhone(obj.getMobilePhone());
		employee.setEmail(obj.getEmail());
		employee.setCep(obj.getCep());
		employee.setCity(obj.getCity());
		employee.setState(obj.getState());
		employee.setAddress(obj.getAddress());
		employee.setNumber(obj.getNumber());
		employee.setDistrict(obj.getDistrict());
		employee.setComplement(obj.getComplement());
	}
}
