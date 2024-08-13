package com.qualitysales.ventsoft.Controllers.DTO;

import java.math.BigDecimal;

public record ProductResponseDTO(
        Integer id,
        Integer itemCode,
        String name,
        String description,
        BigDecimal price,
        Integer stock
) {
}
