package com.qualitysales.ventsoft.Controllers;

import com.qualitysales.ventsoft.Controllers.DTO.CategoryDTO;
import com.qualitysales.ventsoft.model.Category;
import com.qualitysales.ventsoft.service.impl.CategoryServiceImpl;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("/api/vent-soft/category")
@RestController
public class CategoryController {

    private final CategoryServiceImpl categoryService;

    @GetMapping("/find-by/{id}")
    public ResponseEntity<CategoryDTO> findById(@Valid @PathVariable Integer id)  {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<CategoryDTO>> findAll() {
        List<CategoryDTO> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);

    }

    @PostMapping("/save")
    public ResponseEntity<CategoryDTO> save(@Valid @RequestBody Category category)  {

        return ResponseEntity.ok().body(categoryService.save(category));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryDTO> update(@PathVariable Integer id, @RequestBody CategoryDTO categoryDTO)  {

        return ResponseEntity.ok().body(categoryService.update(id, categoryDTO));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {

        categoryService.deleteById(id);

        return ResponseEntity.ok("Category Successfully eliminated");
    }

}
