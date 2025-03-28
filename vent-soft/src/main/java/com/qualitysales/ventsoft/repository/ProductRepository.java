package com.qualitysales.ventsoft.repository;

import com.qualitysales.ventsoft.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findProductByPriceBetween(BigDecimal minPrice, BigDecimal MaxPrice);
}
