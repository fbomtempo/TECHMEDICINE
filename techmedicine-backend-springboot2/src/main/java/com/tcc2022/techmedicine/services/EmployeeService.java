package com.tcc2022.techmedicine.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcc2022.techmedicine.entities.Employee;
import com.tcc2022.techmedicine.repositories.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	public List<Employee> findAll() {
		List<Employee> list = employeeRepository.findAllByOrderByIdDesc();
		return list;
	}
	
	public Employee findById(Long id) {
		Optional<Employee> obj = employeeRepository.findById(id);
		return obj.get();
	}

	public Employee insert(Employee obj) {
		return employeeRepository.save(obj);
	}
	
	public void delete(Long id) {
		employeeRepository.deleteById(id);
	}
	
	public Employee update(Long id, Employee obj) {
		Employee employee = employeeRepository.findById(id).get();
		updateData(employee, obj);
		return employeeRepository.save(employee);
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
