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
    private String lastName;
    @NotBlank
    private String cellPhone;
    @NotBlank
    private String nit;
    private Boolean status;
}
