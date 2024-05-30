package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
}
