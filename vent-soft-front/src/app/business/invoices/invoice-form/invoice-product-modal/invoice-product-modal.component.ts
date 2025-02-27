import { Component, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    ReactiveFormsModule,
  ],
  templateUrl: './invoice-product-modal.component.html',
  styleUrls: ['./invoice-product-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InvoiceProductModalComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InvoiceProductModalComponent>
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSave(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      product.total = product.unitPrice * product.quantity;
      this.dialogRef.close(product);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
