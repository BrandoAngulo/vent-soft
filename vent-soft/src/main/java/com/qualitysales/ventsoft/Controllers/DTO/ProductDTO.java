package com.qualitysales.ventsoft.Controllers.DTO;

import com.qualitysales.ventsoft.model.Category;
import com.qualitysales.ventsoft.model.Supplier;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    @NotBlank(message = "Nombre no debe estar en blanco")
    private String name;
    private Integer itemCode;
    private String description;
    private Supplier supplier;
    private Category category;
    private BigDecimal price;
    private Integer stock;
    private Boolean status;
}
