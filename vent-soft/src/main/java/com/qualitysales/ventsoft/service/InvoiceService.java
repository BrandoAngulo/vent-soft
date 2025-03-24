package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;

import java.util.Set;

public interface InvoiceService {
    Set<RegisterUptadeInvoiceDTO> getInvoices();
    RegisterUptadeInvoiceDTO getInvoice(Integer id);
    RegisterUptadeInvoiceDTO saveInvoice(Invoice invoice);
    RegisterUptadeInvoiceDTO updateInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO);
    boolean anularInvoice(Integer id);
    Set<RegisterUptadeInvoiceDTO> getInvoicesByCustomerId(Integer customerId);

}
