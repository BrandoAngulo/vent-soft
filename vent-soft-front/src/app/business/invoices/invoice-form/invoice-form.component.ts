import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Invoice, InvoiceProduct } from '../invoice/invoice.dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InvoiceProductModalComponent } from './invoice-product-modal/invoice-product-modal.component';
@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  @Output() addInvoice = new EventEmitter<Invoice>();
  invoiceForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceCode: [{ value: 'FAC-001', disabled: true }, Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      customer: ['', Validators.required],
      nit: ['', Validators.required],
      address: ['', Validators.required],
      products: this.fb.array([])
    });
  }

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  openAddProductModal(): void {
    const dialogRef = this.dialog.open(InvoiceProductModalComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result: InvoiceProduct) => {
      if (result) {
        const productGroup = this.fb.group({
          name: [result.name, Validators.required],
          unitPrice: [result.unitPrice, [Validators.required, Validators.min(0)]],
          quantity: [result.quantity, [Validators.required, Validators.min(1)]],
          total: [{ value: result.total, disabled: true }]
        });
        this.products.push(productGroup);
      }
    });
  }

  updateProductTotal(index: number): void {
    const productGroup = this.products.at(index);
    const unitPrice = productGroup.get('unitPrice')?.value || 0;
    const quantity = productGroup.get('quantity')?.value || 0;
    const total = unitPrice * quantity;
    productGroup.get('total')?.setValue(total, { emitEvent: false });
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) {
      this.message = 'Error en el formulario, verifica los datos.';
      return;
    }
    const formValue = this.invoiceForm.getRawValue();
    const subtotal = formValue.products.reduce((sum: number, prod: any) => sum + prod.total, 0);
    const newInvoice: Invoice = {
      id: 0, // se asignará en el componente padre
      invoiceCode: `${formValue.invoiceCode, this.products.length + 1}`,
      customer: formValue.customer,
      nit: formValue.nit,
      address: formValue.address,
      date: formValue.date,
      total: subtotal,
      products: formValue.products
    };
    this.addInvoice.emit(newInvoice);
    this.resetForm();
  }

  resetForm(): void {
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({
      invoiceCode: `FAC-00${this.products.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    });
    while (this.products.length !== 0) {
      this.products.removeAt(0);
    }
    this.message = '';
  }
}
