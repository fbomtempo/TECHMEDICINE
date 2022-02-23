package com.tcc2022.techmedicine.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

}
