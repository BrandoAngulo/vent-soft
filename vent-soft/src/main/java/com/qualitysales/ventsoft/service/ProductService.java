package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.ProductDTO;
import com.qualitysales.ventsoft.model.Product;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {
    List<ProductDTO> findByAll();
    ProductDTO findById(Integer id);
    List<Product> findByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);
    ProductDTO save(Product product);
    Product update(Integer id, ProductDTO productDTO);
    GenericDTO deleteById(Integer id);
}
