package com.qualitysales.ventsoft.Controllers.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class CityDTO  {

    private Integer id;
    private String name;
    private String code;
}
