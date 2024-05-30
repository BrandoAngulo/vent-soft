package com.qualitysales.ventsoft.Controllers.DTO;

import com.qualitysales.ventsoft.model.City;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ClientDTO {
    private Integer id;
    private String name;
    private String lastName;
    private String document;
    private CityDTO city;
    private String residence;
    private String cellPhone;
    private String email;
    private String estate;

}
