package com.springbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springbackend.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
}
