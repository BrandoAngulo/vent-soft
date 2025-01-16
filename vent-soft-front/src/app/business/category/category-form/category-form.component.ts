import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Category } from '../category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {

  @Output() add = new EventEmitter<Category>();
  message = "";
  categoryForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      description: [''],
      status: [true],
    });
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      console.log(this.message = "Creating category error");
    } else {
      console.log(this.categoryForm.value);
      const category: Category = { ...this.categoryForm.value }
      this.add.emit(category);
       // Limpia el formulario y restablece los valores iniciales
    this.categoryForm.reset({
      id: [0],
      description: [''],
    });
    };
  }

}
