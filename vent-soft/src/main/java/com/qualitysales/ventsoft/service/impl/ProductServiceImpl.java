package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.ProductDTO;
import com.qualitysales.ventsoft.model.Product;
import com.qualitysales.ventsoft.repository.CategoryRepository;
import com.qualitysales.ventsoft.repository.ProductRepository;
import com.qualitysales.ventsoft.repository.SupplierRepository;
import com.qualitysales.ventsoft.service.ProductService;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@Slf4j
@Transactional
public class ProductServiceImpl implements ProductService {

    public ProductServiceImpl(ProductRepository productRepository, SupplierRepository supplierRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.categoryRepository = categoryRepository;
    }

    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public List<ProductDTO> findByAll() {
        List<Product> productList = productRepository.findAll();
        try {
            log.info("findById" + productList);
            return productList
                    .stream()
                    .map(product -> ProductDTO.builder()
                            .id(product.getId())
                            .name(product.getName())
                            .itemCode(product.getItemCode())
                            .description(product.getDescription())
                            .supplier(product.getSupplier())
                            .category(product.getCategory())
                            .price(product.getPrice())
                            .stock(product.getStock())
                            .status(product.getStatus())
                            .build()
                    ).toList();

        } catch (RuntimeException e) {
            log.error("findByAll = " + productList);
            throw new RuntimeException(e);
        }
    }

    @Override
    public ProductDTO findById(Integer id) {

        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Error id no existe"));
        try {
            log.info("findById" + product.getId());
            return ProductDTO.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .description(product.getDescription())
                    .supplier(product.getSupplier())
                    .category(product.getCategory())
                    .price(product.getPrice())
                    .stock(product.getStock())
                    .build();
        } catch (RuntimeException e) {
            log.error("findById= " + product);
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public List<Product> findByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        if (minPrice.compareTo(maxPrice) > 0) {

            throw new IllegalArgumentException("El rango de precios no es valido");
        }
        try {
            List<Product> products = productRepository.findProductByPriceBetween(minPrice, maxPrice);
            if (products.isEmpty()) {
                log.warn("No tiene productos");
            }
            return products;

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    @Override
    public ProductDTO save(Product product) {
        try {

            ProductDTO productSave = ProductDTO.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .itemCode(product.getItemCode())
                    .description(product.getDescription())
                    .category(product.getCategory())
                    .supplier(product.getSupplier())
                    .price(product.getPrice())
                    .stock(product.getStock())
                    .status(product.getStatus())
                    .build();
            log.info("productSave = " + productSave);
            productRepository.save(product);
            return  productSave;

        } catch (RuntimeException e) {
            log.error("save" + product);
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public Product update(Integer id, ProductDTO productDTO) {
        Product product = productRepository.findById(id).orElseThrow
                (() -> new RuntimeException("Product not found"));
        try {
            product.setName(productDTO.getName());
            product.setItemCode(productDTO.getItemCode());
            product.setDescription(productDTO.getDescription());
            product.setSupplier(productDTO.getSupplier());
            product.setCategory(productDTO.getCategory());
            product.setPrice(productDTO.getPrice());
            product.setStock(productDTO.getStock());
            product.setStatus(productDTO.getStatus());
            log.info("update = " + product);
            return productRepository.save(product);
        } catch (RuntimeException e) {
            log.error("update = " + product);
            throw new RuntimeException(e);
        }
    }

    @Override
    public GenericDTO deleteById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ApplicationContextException(MessagesEnum.REQUEST_FAILED.getMessage(), null));
        try {
            log.info("deleteById/product delete successfully: " + product);
            productRepository.deleteById(id);
            return GenericDTO.genericSuccess(MessagesEnum.REQUEST_SUCCESS, HttpStatus.OK.value());
        } catch (Exception e) {
            log.error("deleteBiId: " + product);
            throw new ApplicationContextException(e.getMessage());
        }
    }
}
