package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.SupplierDTO;
import com.qualitysales.ventsoft.model.Supplier;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;

import java.util.List;

public interface SupplierService {

    List<SupplierDTO> findByAll();
    Supplier findById(Integer id) throws RuntimeException;
    SupplierDTO save(Supplier supplier);
    Supplier update(Integer id, SupplierDTO supplierDTO);
    GenericDTO deleteById(Integer id);
}
