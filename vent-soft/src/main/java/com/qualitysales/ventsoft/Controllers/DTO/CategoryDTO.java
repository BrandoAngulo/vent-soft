package com.qualitysales.ventsoft.Controllers.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CategoryDTO {
    private Integer id;
    @NotBlank(message = "la descripcion de categoria no debe ser vacia")
    private String description;
}
