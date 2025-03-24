import { Component, OnInit } from '@angular/core';
import { UiTableComponent, TableColumn } from '../../shared/components/ui-table/ui-table.component';
import { CategoryFormComponent } from "./category-form/category-form.component";
import { CategoryDTO } from './category.dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { CategoryService } from './services/category.service';
import { ApiResponse } from '../../../apiResponse.dto';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [UiTableComponent, CategoryFormComponent, MatProgressSpinnerModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export default class CategoryComponent implements OnInit {
  categories: CategoryDTO[] = [];
  tableColumns: TableColumn<CategoryDTO>[] = [];
  loadingCategory = true;
  selectedCategory: CategoryDTO | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
    this.setTableColumns();
  }

  getCategories() {
    this.loadingCategory = true;
    this.categoryService.list().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loadingCategory = false;
      },
      error: (err) => {
        console.error('Error loading categories: ', err)
        this.loadingCategory = false;
      },
    });
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },

      {
        label: 'Categoria',
        def: 'description',
        content: (row) => row.description,
      },

      {
        label: 'Estado',
        def: 'status',
        content: (row) => row.status,
      },

      {
        label: 'Acciones',
        def: 'acciones',
        content: () => ''
      }

    ]

  }

  addCategory(category: CategoryDTO) {
    console.log(category);
    this.categoryService.create(category).subscribe({
      next: (newCategory) => {
        this.getCategories();
        this.selectedCategory = null
        console.log("categoria creada exitosamente", newCategory);
      },
      error: (err) => {
        console.error("error al crear la categoria: ", err);
      },
    })
  }

  editCategory(categoryDTO: CategoryDTO): void {
    this.selectedCategory = { ...categoryDTO };
  }

  deleteCategory(categoryDTO: CategoryDTO): void {
    if (!categoryDTO.id) {
      console.error('Category not found');
      return;
    }
    this.categoryService.delete(categoryDTO.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.categories = this.categories.filter(category => category.id !== categoryDTO.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`)
      },
      error: (err) => {
        console.error('Category deleted error: ', err);
      },
    });
  }
  
  updateCategory(categoryDTO: CategoryDTO): void {
    if (!categoryDTO) {
      console.error("Category not found")
      return;
    }
    this.categoryService.update(categoryDTO.id, categoryDTO).subscribe({
      next: (updateCategory) => {
        this.getCategories();
        this.selectedCategory = null;
        console.log("category updated successfull: ", updateCategory)
      },
      error: (err) => {
        console.error('Error al actualizar la categoria: ', err);
      },
    })
  }

  updateCategoryStatus(categoryDTO: CategoryDTO): void {
    if (!categoryDTO.id) {
      console.error('ID not found');
      return;
    }

    this.categoryService.update(categoryDTO.id, categoryDTO).subscribe({
      next: (updatedCategory) => {
        this.getCategories(); // Refrescar la lista
        this.selectedCategory = null; // Limpiar selección
        console.log('categoria actualizada exitosamente:', updatedCategory);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        // Si hay error, podrías revertir el cambio en la UI
        const index = this.categories.findIndex(category => category.id === categoryDTO.id);
        if (index !== -1) {
          this.categories[index].status = !categoryDTO.status; // Revertir el cambio
          this.categories = [...this.categories]; // Forzar actualización
        }
      }
    });
  }
}
