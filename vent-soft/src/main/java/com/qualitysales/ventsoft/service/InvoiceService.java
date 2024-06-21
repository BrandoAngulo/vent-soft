package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;

import java.util.List;

public interface InvoiceService {
    List<RegisterUptadeInvoiceDTO> getInvoices();
    RegisterUptadeInvoiceDTO getInvoice(Integer id);
    RegisterUptadeInvoiceDTO saveInvoice(Invoice invoice);
    RegisterUptadeInvoiceDTO updateInvoice(RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO);
    boolean anularInvoice(Integer id);
    List<RegisterUptadeInvoiceDTO> getInvoicesByCustomerId(Integer customerId);

}
