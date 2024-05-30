package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
