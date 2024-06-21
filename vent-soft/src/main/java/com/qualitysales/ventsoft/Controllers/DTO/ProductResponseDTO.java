package com.qualitysales.ventsoft.Controllers.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public record ProductResponseDTO(
        Integer id,
        @JsonProperty("item_code")
        Integer itemCode,
        String name,
        String description,
        BigDecimal price,
        Integer stock
) {
}
