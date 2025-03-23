package com.qualitysales.ventsoft.service;

import com.qualitysales.ventsoft.Controllers.DTO.CategoryDTO;
import com.qualitysales.ventsoft.model.Category;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> findAll();

    CategoryDTO findById(Integer id);

    CategoryDTO save(Category category);

    CategoryDTO update(Integer id, CategoryDTO categoryDTO);

    GenericDTO deleteById(Integer id);

}
