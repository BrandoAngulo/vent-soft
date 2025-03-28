package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByDescription(String description);
}
