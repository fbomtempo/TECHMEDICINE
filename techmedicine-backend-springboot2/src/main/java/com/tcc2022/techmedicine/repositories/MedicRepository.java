package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tcc2022.techmedicine.entities.Medic;

public interface MedicRepository extends JpaRepository<Medic, Long> {

	List<Medic> findAllByOrderByIdDesc();
	@Query(value = "SELECT * FROM tb_medic "
			 + "WHERE CONCAT(TRIM(name), ' ', TRIM(surname)) "
			 + "ILIKE :filter%",
	   countQuery = "SELECT COUNT(*) FROM tb_medic "
			 + "WHERE CONCAT(TRIM(name), ' ', TRIM(surname)) "
			 + "ILIKE :filter%",
	   nativeQuery = true)
	Page<Medic> findMedicsByFilter(Pageable pageable, @Param("filter") String filter);
	List<Medic> findAllByOrderByNameAscSurnameAsc();
}
