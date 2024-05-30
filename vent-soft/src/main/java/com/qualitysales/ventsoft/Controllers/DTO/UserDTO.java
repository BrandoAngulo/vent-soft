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
public class UserDTO {

    private Integer id;
    @NotBlank
    private String name;
    private String lastName;
    private String code;
    private String email;
    private String state;

}
