import { Component, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProductDTO } from '../../../product/product.dto';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-invoice-product-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './invoice-product-modal.component.html',
  styleUrls: ['./invoice-product-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceProductModalComponent {
  productForm: FormGroup;
  products: ProductDTO[] = [];
  filteredProducts: ProductDTO[] = [];
  loadingProducts = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InvoiceProductModalComponent>,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      product: [null, Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });

    this.getProducts();

    this.productForm.get('product')?.valueChanges.subscribe((product: ProductDTO) => {
      if (product) {
        this.productForm.patchValue({
          unitPrice: product.price
        });
      }
    });
  }

  getProducts(): void {
    this.loadingProducts = true;
    this.productService.list().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.loadingProducts = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.loadingProducts = false;
      }
    });
  }

  filterProducts(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(filterValue) ||
      product.id.toString().includes(filterValue)
    );
  }

  compareProducts(p1: ProductDTO, p2: ProductDTO): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  onSave(): void {
    if (this.productForm.valid) {
      const { product, unitPrice, quantity } = this.productForm.value;
      const total = unitPrice * quantity;
      this.dialogRef.close({
        productId: product.id,
        name: product.name,
        unitPrice: unitPrice,
        quantity: quantity,
        total: total
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}