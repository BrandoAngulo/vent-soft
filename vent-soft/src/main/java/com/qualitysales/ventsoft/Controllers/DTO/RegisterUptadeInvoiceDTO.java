package com.qualitysales.ventsoft.Controllers.DTO;

import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.model.ItemInvoice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Builder
public record RegisterUptadeInvoiceDTO(
         Integer id,
         String invoiceCode,
         Client client,
         String date,
         BigDecimal total,
         ItemInvoice itemInvoice,
         boolean status
) {
}
