package com.tcc2022.techmedicine.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tcc2022.techmedicine.entities.Disease;

public interface DiseaseRepository extends JpaRepository<Disease, Long> {
	
	List<Disease> findAllByOrderByIdDesc();
	@Query(value = "SELECT * FROM tb_disease "
				 + "WHERE TRIM(description) "
				 + "ILIKE :filter%",
		   countQuery = "SELECT COUNT(*) FROM tb_disease "
				 + "WHERE TRIM(description) "
				 + "ILIKE :filter%",
		   nativeQuery = true)
	Page<Disease> findDiseasesByFilter(Pageable pageable, @Param("filter") String filter);
	List<Disease> findAllByOrderByDescriptionAsc();
}
