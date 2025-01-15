package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.CityDTO;
import com.qualitysales.ventsoft.mapper.CityMapper;
import com.qualitysales.ventsoft.model.City;
import com.qualitysales.ventsoft.repository.CityRepository;
import com.qualitysales.ventsoft.service.CityService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    @Override
    public CityDTO findCity(Integer id) {

        City cityId = cityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found"));
        CityDTO cityDTO = CityMapper.MAPPER.toCity(cityId);

        try {
            log.info("findCity ok: {}", cityDTO);
            return cityDTO;

        } catch (RuntimeException e) {
            log.info("findCity throw: {}", cityDTO);
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public List<CityDTO> findCities() {
        List<City> cities = cityRepository.findAll();
        List<CityDTO> cityDTOS = CityMapper.MAPPER.toCities(cities);
        try {
            likes("hola", "carlos", "luis");
            log.info("findCities OK: {}", cities);
            return cityDTOS;

        } catch (RuntimeException e) {
            log.info("findCities throw {}", cities);
            throw new IllegalArgumentException(e);

        }
    }

    @Override
    public CityDTO saveCity(City city) {
        try {
            cityRepository.save(city);
            CityDTO cityDTO = CityMapper.MAPPER.toCity(city);
            log.info("saveCity ok: {}", city);

            return cityDTO;
        } catch (RuntimeException e) {
            log.error("saveCity throw: {}", city);
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public CityDTO updateCity(Integer id, City city) {
        City findId = cityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found"));
        CityDTO cityDTO = CityMapper.MAPPER.toCity(findId);
        if (findId.getId().equals(city.getId())) {
            throw new IllegalArgumentException("Id is present");
        }

        try {
            log.info("updateCity ok: {}", city);
            cityDTO.setCode(city.getCode());
            cityDTO.setName(city.getName());
            cityRepository.save(city);
            return cityDTO;
        } catch (RuntimeException e) {
            log.error("updateCity throw: {}", city);
            throw new IllegalArgumentException(e);
        }

    }

    @Override
    public void deleteCity(Integer id) {
        City findId = cityRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found"));
        try {
            log.info("deleteCity ok: {}", findId);
            cityRepository.delete(findId);
        } catch (Exception e) {
            log.error("deleteCity throw: {}", findId);
            throw new IllegalArgumentException(e);
        }
    }

    public double prueba(int mpg) {

        double fmk = 1.609344;
        double flg = 4.54609188;

        double kpl = (fmk * mpg) / flg;
        String rs = (String.format("%.2f", kpl));
        rs = rs.replace(",", ".");
        System.out.println("resultadoFormateado = " + rs);
        return Double.parseDouble(rs);

    }

    public int[] arrayDiff(int[] a, int[] b) {
        /*Tu objetivo en esta kata es implementar una función diferencia, que reste una lista de otra y devuelva el resultado.
    Debe eliminar todos los valores de la lista a, que están presentes en la lista b manteniendo su orden.
    Kata.arrayDiff(new int[] {1, 2}, new int[] {1}) => new int[] {2}
    Si un valor está presente en b, todas sus ocurrencias deben ser eliminadas de la otra:
    Kata.arrayDiff(new int[] {1, 2, 2, 2, 3}, new int[] {2}) => new int[] {1, 3}*/
        boolean[] enB = new boolean[1000]; // Ajustar el tamaño según el rango de valores esperados
        // Marcar los elementos de b como "presentes"
        for (int num : b) {
            enB[Math.abs(num)] = true; // Manejar números negativos
        }
        // Crear un nuevo array para el resultado
        int[] resultado = new int[a.length];
        int indiceResultado = 0;
        // Agregar elementos de a al resultado si no están en b
        for (int num : a) {
            if (!enB[Math.abs(num)]) {
                resultado[indiceResultado++] = num;
            }
        }
        // Crear un array final con el tamaño correcto
        int[] resultadoFinal = new int[indiceResultado];
        System.arraycopy(resultado, 0, resultadoFinal, 0, indiceResultado);
        return resultadoFinal;
    }

    public String likes(String... names) {
        /*Probablemente conozcas el sistema de «me gusta» de Facebook y otras páginas. La gente puede dar «me gusta» a
        entradas de blog, fotos u otros elementos. Queremos crear el texto que debe aparecer junto a un elemento de este tipo.
        Implementar la función que toma una matriz que contiene los nombres de las personas que como un elemento. Debe
        devolver el texto que se muestra en los ejemplos:
        []                                -->  "no one likes this"
        ["Peter"]                         -->  "Peter likes this"
        ["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
        ["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
        ["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"
        Nota: Para 4 o más nombres, el número en «y otros 2» simplemente aumenta.*/

        List<String> lista = new ArrayList<>();

        for (String name : names) {
            lista.add(name);
            System.out.println("lista = " + lista);
        }

        return "";
    }


}
