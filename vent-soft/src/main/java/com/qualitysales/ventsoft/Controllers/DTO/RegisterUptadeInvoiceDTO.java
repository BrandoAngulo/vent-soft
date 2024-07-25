package com.qualitysales.ventsoft.Controllers.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.qualitysales.ventsoft.model.Client;

import java.math.BigDecimal;
import java.util.Set;

public record RegisterUptadeInvoiceDTO(
         Integer id,
         String invoiceCode,
         Client client,
         String date,
         BigDecimal total,
         Set<ItemInvoiceDTO> itemInvoices,
         boolean status
) {
}
