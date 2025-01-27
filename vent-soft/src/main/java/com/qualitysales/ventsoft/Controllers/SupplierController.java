package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.SupplierDTO;
import com.qualitysales.ventsoft.model.Supplier;
import com.qualitysales.ventsoft.service.impl.SupplierServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ventsoft/supplier")
public class SupplierController {

    private final SupplierServiceImpl supplierService;

    public SupplierController(SupplierServiceImpl supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping("/findBy/{id}")
    public ResponseEntity<?> findByid(@PathVariable Integer id) {

        return ResponseEntity.ok(supplierService.findById(id));
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {

        return ResponseEntity.ok(supplierService.findByAll());
    }

    @PostMapping("/save")
    public ResponseEntity<SupplierDTO> save(@Valid @RequestBody Supplier supplier) {

        return ResponseEntity.ok(supplierService.save(supplier));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Supplier> update(@PathVariable Integer id, @RequestBody SupplierDTO supplierDTO) {
        return ResponseEntity.ok(supplierService.update(id, supplierDTO));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Integer id) {
        supplierService.deleteById(id);
    }

}
