package com.qualitysales.ventsoft.Controllers.DTO;

import com.qualitysales.ventsoft.model.City;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class ClientDTO {
    private Integer id;
    private String name;
    private String lastName;
    private String document;
    private String residence;
    private String cellPhone;
    private City city;
    private String docTipe;
    private String email;
    private Boolean status;
}
