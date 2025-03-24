package com.qualitysales.ventsoft.mapper;

import com.qualitysales.ventsoft.Controllers.DTO.CityDTO;
import com.qualitysales.ventsoft.model.City;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface CityMapper {

    CityMapper MAPPER = Mappers.getMapper(CityMapper.class);

    City toCityDTO(CityDTO cityDTO);

    CityDTO toCity(City city);

    List<City> toCitiesDTO(List<CityDTO> cityDTOS);

    List<CityDTO> toCities(List<City> cities);
}
