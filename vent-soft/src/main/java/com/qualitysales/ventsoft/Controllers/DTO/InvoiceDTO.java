package com.qualitysales.ventsoft.Controllers.DTO;

import com.qualitysales.ventsoft.model.Client;
import com.qualitysales.ventsoft.model.ItemInvoice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class InvoiceDTO {
    private Integer id;
    private String invoiceCode;
    private Client client;
    private String date;
    private BigDecimal total;
    private ItemInvoice itemInvoice;
    private String status;
}
