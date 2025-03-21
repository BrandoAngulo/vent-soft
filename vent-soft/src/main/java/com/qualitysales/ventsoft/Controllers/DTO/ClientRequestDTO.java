package com.qualitysales.ventsoft.Controllers.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ClientRequestDTO {
    private Integer id;
    private String name;
    private String lastName;
    private String document;
    private CityDTO city;
    private String residence;
    private String cellPhone;
    private String email;
    private Boolean status;

}
