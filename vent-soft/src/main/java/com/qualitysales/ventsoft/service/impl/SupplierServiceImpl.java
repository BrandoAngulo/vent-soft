package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.SupplierDTO;
import com.qualitysales.ventsoft.model.Supplier;
import com.qualitysales.ventsoft.repository.SupplierRepository;
import com.qualitysales.ventsoft.service.SupplierService;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Transactional
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierServiceImpl(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @Override
    public List<SupplierDTO> findByAll() {
        List<Supplier> listSupplier = supplierRepository.findAll();

        try {
            log.info("finByAll: " + listSupplier);
            return listSupplier.stream().map(supplier -> SupplierDTO.builder()
                            .id(supplier.getId())
                            .name(supplier.getName())
                            .lastName(supplier.getLastName())
                            .cellPhone(supplier.getCellPhone())
                            .nit(supplier.getNit())
                            .status(supplier.getStatus())
                            .build())
                    .toList();
        } catch (RuntimeException e) {
            log.error("finByAll: " + listSupplier);
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public Supplier findById(Integer id) {

        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("id no existe"));
        try {

            return supplier;

        } catch (RuntimeException e) {
            log.error("findById = " + supplier);
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public SupplierDTO save(Supplier supplier) {
        if (supplier.getName() == null) {
            log.error("error en el id = " + supplier);
        }
        try {
            SupplierDTO supplierDto = SupplierDTO.builder()
                    .name(supplier.getName())
                    .lastName(supplier.getLastName())
                    .cellPhone(supplier.getCellPhone())
                    .nit(supplier.getNit())
                    .status(supplier.getStatus())
                    .build();
            supplierRepository.save(supplier);
            return supplierDto;

        } catch (RuntimeException e) {
            log.error("save" + supplier);
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public Supplier update(Integer id, SupplierDTO supplierDTO) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow(() -> new RuntimeException("El id no existe"));
        try {
            supplier.setName(supplierDTO.getName());
            supplier.setLastName(supplierDTO.getLastName());
            supplier.setCellPhone(supplierDTO.getCellPhone());
            supplier.setNit(supplierDTO.getNit());
            supplier.setStatus(supplierDTO.getStatus());
            log.info("update: " + supplier);
            return supplierRepository.save(supplier);


        } catch (RuntimeException e) {
            log.error("update" + supplier);
            throw new RuntimeException(e);
        }
    }


    @Override
    public GenericDTO deleteById(Integer id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ApplicationContextException(MessagesEnum.REQUEST_FAILED.getMessage(), null));
        try {
            log.info("deleteById" + supplier);
            supplierRepository.deleteById(supplier.getId());
            return GenericDTO.genericSuccess(MessagesEnum.REQUEST_SUCCESS, HttpStatus.OK.value());
        } catch (RuntimeException e) {
            log.error("deleteById" + supplier);
            throw new ApplicationContextException(e.getMessage());
        }
    }
}
