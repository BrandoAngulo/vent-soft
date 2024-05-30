package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    List<Client> findByNameOrLastName(String name, String lastName);
}
