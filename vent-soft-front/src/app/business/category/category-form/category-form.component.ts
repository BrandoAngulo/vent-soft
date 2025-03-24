import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CategoryDTO } from '../category.dto';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, OnChanges {

  @Output() add = new EventEmitter<CategoryDTO>();
  @Input() categoryEdit: CategoryDTO | null = null;
  @Output() update = new EventEmitter<CategoryDTO>;

  message = "";
  categoryForm!: FormGroup;
  submit = false;

  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      description: [''],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.loadCategoryData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryEdit']) {
      this.loadCategoryData();
    }
  }

  loadCategoryData() {
    if (this.categoryEdit) {
      this.categoryForm.patchValue({
        description: this.categoryEdit?.description,
      });
    } else {
      this.categoryForm.reset({
        description: '',
        status: true,
      });
    }
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      console.log(this.message = "Creating category error");
      return;
    }
    this.submit = true;
    const formValue = this.categoryForm.value;
    const category: CategoryDTO = {
      ...formValue,
      id: this.categoryEdit?.id,
      status: true
    }
    if (this.categoryEdit) {
      console.log("Actualizar");
      this.update.emit(category);
    } else {
      console.log("Agregar");
      this.add.emit(category);
    }
    this.submit = false;
    this.categoryForm.reset({
      description: '',
    })
  }

}
