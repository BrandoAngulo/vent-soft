package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.RegisterUptadeInvoiceDTO;
import com.qualitysales.ventsoft.model.Invoice;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;

import java.util.Set;

public interface InvoiceService {
    Set<RegisterUptadeInvoiceDTO> getInvoices();
    RegisterUptadeInvoiceDTO getInvoice(Integer id);
    RegisterUptadeInvoiceDTO saveInvoice(Invoice invoice);
    RegisterUptadeInvoiceDTO updateInvoice(Integer id, RegisterUptadeInvoiceDTO registerUptadeInvoiceDTO);
    GenericDTO anularInvoice(Integer id);
    Set<RegisterUptadeInvoiceDTO> getInvoicesByCustomerId(Integer customerId);

}
