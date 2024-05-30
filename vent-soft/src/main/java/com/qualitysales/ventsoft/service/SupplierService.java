package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.SupplierDTO;
import com.qualitysales.ventsoft.model.Supplier;

import java.util.List;

public interface SupplierService {

    List<SupplierDTO> findByAll();
    Supplier findById(Integer id) throws RuntimeException;
    SupplierDTO save(Supplier supplier);
    Supplier update(Integer id, SupplierDTO supplierDTO);
    void deleteById(Integer id);
}
