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
public class SupplierDTO {
    private Integer id;
    @NotBlank(message = "el nombre de supplier no debe ser vacia")
    private String name;
    @NotBlank
    private String phone;
    @NotBlank
    private String nit;
}
