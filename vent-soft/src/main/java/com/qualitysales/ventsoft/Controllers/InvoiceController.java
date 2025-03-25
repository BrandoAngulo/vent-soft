package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;
import com.qualitysales.ventsoft.service.impl.InvoiceServiceImpl;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/vent-soft/invoice")
@CrossOrigin
public class InvoiceController {
    private final InvoiceServiceImpl invoiceService;

    public InvoiceController(InvoiceServiceImpl invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping("/get-invoices")
    public Set<RegisterUptadeInvoiceDTO> getInvoices() {

        return ResponseEntity.ok(invoiceService.getInvoices()).getBody();
    }

    @GetMapping("/get-invoice/{id}")
    public ResponseEntity<RegisterUptadeInvoiceDTO> getInvoice(@PathVariable Integer id) {
        return ResponseEntity.ok(invoiceService.getInvoice(id));
    }

    @PostMapping("/save-invoice")
    public ResponseEntity<RegisterUptadeInvoiceDTO> saveInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @PutMapping("/update-invoice/{id}")
    public ResponseEntity<RegisterUptadeInvoiceDTO> updateInvoice(@PathVariable Integer id, @RequestBody RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO) {
        return ResponseEntity.ok(invoiceService.updateInvoice(id, registerUptadeInvoiceDTO));
    }

    @PostMapping("/cancel-invoice/{id}")
    public ResponseEntity<GenericDTO> anularInvoice(@PathVariable Integer id) {
        return ResponseEntity.ok(invoiceService.anularInvoice(id));
    }

    @GetMapping("/invoices-customer-id/{customerId}")
    public ResponseEntity<Set<RegisterUptadeInvoiceDTO>> getCustomerInvoices(@PathVariable Integer customerId) {
        return ResponseEntity.ok(invoiceService.getInvoicesByCustomerId(customerId));
    }
}
