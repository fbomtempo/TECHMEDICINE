package com.tcc2022.techmedicine.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tcc2022.techmedicine.entities.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {

	Optional<UserInfo> findByUsername(String username);
}
