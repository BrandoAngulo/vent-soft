package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.CityDTO;
import com.qualitysales.ventsoft.model.City;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;

import java.util.List;

public interface CityService {
    CityDTO findCity(Integer id);

    List<CityDTO> findCities();

    CityDTO saveCity(City city);

    CityDTO updateCity(Integer id, City city);

    GenericDTO deleteCity(Integer id);

}
