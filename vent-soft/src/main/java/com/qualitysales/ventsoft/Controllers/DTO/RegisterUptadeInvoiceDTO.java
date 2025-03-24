package com.qualitysales.ventsoft.Controllers.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.qualitysales.ventsoft.model.Client;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public record RegisterUptadeInvoiceDTO(
         Integer id,
         String invoiceCode,
         ClientDTO client,
         LocalDate date,
         BigDecimal total,
         Set<ItemInvoiceDTO> itemInvoices,
         boolean status
) {
}
