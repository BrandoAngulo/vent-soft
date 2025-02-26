/* import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Invoice, InvoiceProduct } from '../invoice.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  @Output() addInvoice = new EventEmitter<Invoice>();
  invoiceForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder) {}

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

  addProduct(): void {
    const productGroup = this.fb.group({
      name: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      total: [{ value: 0, disabled: true }]
    });
    this.products.push(productGroup);
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  updateProductTotal(index: number): void {
    const productGroup = this.products.at(index);
    const unitPrice = productGroup.get('unitPrice')?.value || 0;
    const quantity = productGroup.get('quantity')?.value || 0;
    const total = unitPrice * quantity;
    productGroup.get('total')?.setValue(total, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) {
      this.message = 'Error en el formulario, verifica los datos.';
      return;
    }
    // Obtener valores incluyendo los controles deshabilitados
    const formValue = this.invoiceForm.getRawValue();
    const subtotal = formValue.products.reduce((sum: number, prod: any) => sum + prod.total, 0);
    const newInvoice: Invoice = {
      id: 0, // se asignará en el componente padre
      invoiceCode: formValue.invoiceCode,
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
      invoiceCode: 'FAC-001',
      date: new Date().toISOString().split('T')[0]
    });
    while (this.products.length !== 0) {
      this.products.removeAt(0);
    }
  }
}
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Invoice, InvoiceProduct } from '../invoice.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  @Output() addInvoice = new EventEmitter<Invoice>();
  message: string = '';

  // Objeto que se usa en el formulario
  newInvoice: Invoice = {
    id: 0,
    invoiceCode: 'FAC-001',
    customer: '',
    nit: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    total: 0,
    products: []
  };

  ngOnInit(): void {
    // Se puede inicializar aquí si se requiere
  }

  addProduct(): void {
    const newProduct: InvoiceProduct = { name: '', unitPrice: 0, quantity: 1, total: 0 };
    this.newInvoice.products.push(newProduct);
  }

  removeProduct(index: number): void {
    this.newInvoice.products.splice(index, 1);
  }

  updateProductTotal(product: InvoiceProduct): void {
    product.total = product.unitPrice * product.quantity;
  }

  calculateSubtotal(): number {
    return this.newInvoice.products.reduce((sum, prod) => sum + prod.total, 0);
  }

  onSaveInvoice(): void {
    if (!this.newInvoice.customer || !this.newInvoice.nit || !this.newInvoice.address) {
      this.message = 'Complete los campos requeridos.';
      return;
    }
    // Calcula el subtotal de los productos
    const subtotal = this.calculateSubtotal();
    const invoiceToEmit: Invoice = {
      ...this.newInvoice,
      id: 0, // se asignará en el componente padre
      total: subtotal
    };
    this.addInvoice.emit(invoiceToEmit);
    this.resetForm();
  }

  resetForm(): void {
    this.newInvoice = {
      id: 0,
      invoiceCode: 'FAC-001',
      customer: '',
      nit: '',
      address: '',
      date: new Date().toISOString().split('T')[0],
      total: 0,
      products: []
    };
    this.message = '';
  }
}
