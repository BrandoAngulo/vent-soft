import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Output() add = new EventEmitter<Product>();
  message = "";
  productForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      name: ['', [Validators.required]],
      description: [''],
      itemCode: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addProduct() {
    if (this.productForm.invalid) {
      console.log(this.message = "Creating product error");
    } else {
      console.log(this.productForm.value);
      const product: Product = { ...this.productForm.value }
      this.add.emit(product);
       // Limpia el formulario y restablece los valores iniciales
    this.productForm.reset({
      id: [0],
      name: [''],
      description: [''],
      itemCode: [0],
      price: [0.0],
      stock: [0]
    });
    };
  }
}
