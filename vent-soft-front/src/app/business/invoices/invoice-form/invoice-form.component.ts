import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Invoice } from '../invoice.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoicesComponent } from '../invoices.component';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.css'
})
export class InvoiceFormComponent {

  @Output() add = new EventEmitter<Invoice>();
  message = "";
  invoiceForm!: FormGroup;
  invoices: InvoicesComponent = new InvoicesComponent;
  newInvoice!: Invoice;

  constructor(private formBuilder: FormBuilder) {
    this.invoiceForm = this.formBuilder.group({
      id: [0, [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      invoiceCode: [`FAC-${this.invoices.getInvoices.length + 1}`, Validators.required],
      customer: ['', [Validators.required]],
      nit: ['', [Validators.required]],
      address: [''],
      date: [new Date().toISOString().split('T')[0], [Validators.required]],
      total: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      products: [''],
    });
  }

  addInvoice() {
    if (this.invoiceForm.invalid) {
      console.log(this.message = "Creating invoice error");
    } else {
      console.log(this.invoiceForm.value);
      const subtotal = this.newInvoice.products.reduce((sum, prod) => sum + prod.price, 0);
      const newInvoiceCode = this.invoices.getInvoices.length + 1;
      const invoice: Invoice = {
        ...this.invoiceForm.value,
        invoiceCode: newInvoiceCode,
        total: subtotal
      }
      this.add.emit(invoice);
      // Limpia el formulario y restablece los valores iniciales
      this.invoiceForm.reset({
        id: [0],
        invoiceCode: [''],
        customer: [''],
        nit: [''],
        addres: [0],
        date: new Date().toISOString().split('T')[0],
        total: [0.0],
        products: [],
      });
    };
  }
  
  onInvoiceChange(updatedInvoice: Invoice): void {
    this.newInvoice = updatedInvoice;
  }
}
