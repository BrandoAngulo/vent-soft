package com.qualitysales.ventsoft.Controllers.DTO;


public record ItemInvoiceDTO(
        Integer id,
        ProductResponseDTO product,
        Integer amountSold
) {
}
