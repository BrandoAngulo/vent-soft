package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.InvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;
import com.qualitysales.ventsoft.service.impl.InvoiceServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vent-soft/invoice")
public class InvoiceController {
    private final InvoiceServiceImpl invoiceService;

    public InvoiceController(InvoiceServiceImpl invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping("/get-invoices")
    public List<InvoiceDTO> getInvoices() {

        return ResponseEntity.ok(invoiceService.getInvoices()).getBody();
    }

    @GetMapping("/get-invoice/{id}")
    public ResponseEntity<InvoiceDTO> getInvoice(@PathVariable Integer id) {
        return ResponseEntity.ok(invoiceService.getInvoice(id));
    }

    @PostMapping("/save-invoice")
    public ResponseEntity<InvoiceDTO> saveInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.saveInvoice(invoice));
    }

    @PutMapping("/update-invoice/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Integer id, @RequestBody InvoiceDTO invoiceDTO) {
        return ResponseEntity.ok(invoiceService.updateInvoice(id, invoiceDTO));
    }

    @PostMapping("/inactivar-invoice/{id}")
    public ResponseEntity<Invoice> anularInvoice(@PathVariable Integer id) {
        return ResponseEntity.ok(invoiceService.anularInvoice(id));
    }

    @GetMapping("/invoices-customer-id/{customerId}")
    public ResponseEntity<List<InvoiceDTO>> getCustomerInvoices(@PathVariable Integer customerId) {
        return ResponseEntity.ok(invoiceService.getInvoicesByCustomerId(customerId));
    }
}
