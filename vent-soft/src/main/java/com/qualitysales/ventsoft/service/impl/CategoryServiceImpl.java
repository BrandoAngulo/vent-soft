package com.qualitysales.ventsoft.service.impl;

import com.qualitysales.ventsoft.Controllers.DTO.CategoryDTO;
import com.qualitysales.ventsoft.mapper.CategoryMapper;
import com.qualitysales.ventsoft.model.Category;
import com.qualitysales.ventsoft.repository.CategoryRepository;
import com.qualitysales.ventsoft.service.CategoryService;
import com.qualitysales.ventsoft.utils.dto.GenericDTO;
import com.qualitysales.ventsoft.utils.enums.MessagesEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private static final  String NF = "id not found";

    @Override
    public List<CategoryDTO> findAll() {
        List<Category> categories = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = CategoryMapper.MAPPER.toCategoryDTOS(categories);
        try {
            log.info("findByAll: {}", categories);
            return categoryDTOList;

        } catch (RuntimeException e) {
            log.error("findByAll: " + categories);
            throw new IllegalArgumentException(e);

        }
    }

    @Override
    public CategoryDTO findById(Integer id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(NF));
        CategoryDTO categoryDTO = CategoryMapper.MAPPER.toCategoryDTO(category);
        try {
            log.info("findById: {}", category);
            return categoryDTO;

        } catch (RuntimeException e) {

            log.error("findById: " + category);
            throw new IllegalArgumentException(e);
        }
    }


    @Override
    public CategoryDTO save(Category category) {
        if (category.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description is blank");
        }
        try {
            CategoryDTO saveCategoryDTO = CategoryMapper.MAPPER.toCategoryDTO(category);
           categoryRepository.save(category);
           log.info("save: {}", category);
           return saveCategoryDTO;

        } catch (IllegalArgumentException e) {
            log.error("save: {}", category);
            throw new IllegalArgumentException(e);
        }
    }

    @Override
    public CategoryDTO update(Integer id, CategoryDTO categoryDTO) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(NF));

        try {
            category.setDescription(categoryDTO.getDescription());
            category.setStatus(categoryDTO.getStatus());
            categoryRepository.save(category);
            log.info("update: {}", category);
            return categoryDTO;

        } catch (IllegalArgumentException e) {
            log.error("update{}", category);
            throw new IllegalArgumentException(e);

        }
    }

    @Override
    public GenericDTO deleteById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ApplicationContextException(MessagesEnum.REQUEST_FAILED.getMessage(), null));
        try {
            log.info("deleteById/ Success{}", category);
            categoryRepository.deleteById(id);
            return GenericDTO.genericSuccess(MessagesEnum.REQUEST_SUCCESS, HttpStatus.OK.value());

        } catch (Exception e) {
            log.error("deleteById/throw{}", category);
            throw new ApplicationContextException(e.getMessage());
        }
    }
}
