import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { InvoiceProductModalComponent } from './invoice-product-modal/invoice-product-modal.component';
import { InvoiceService } from '../services/invoice.service';
import { CustomerDTO } from '../../customer/customer.dto';
import { ProductDTO } from '../../product/product.dto';
import { InvoiceDTO } from '../invoice/invoice.dto';
import { CustomerService } from '../../customer/services/customer.service';
import { ItemInvoiceDTO } from '../invoice/itemInvoice.dto';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  @Input() selectedInvoice: InvoiceDTO | null = null;
  @Output() addInvoice = new EventEmitter<InvoiceDTO>();
  @Output() updateInvoice = new EventEmitter<{ id: number; invoice: InvoiceDTO }>();
  invoiceForm!: FormGroup;
  message: string = '';
  customers: CustomerDTO[] = [];
  filteredCustomers: CustomerDTO[] = [];
  loadingCustomers = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private invoiceService: InvoiceService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getCustomers();
  }

  ngOnChanges(): void {
    if (this.selectedInvoice) {
      this.loadInvoiceForEdit();
    }
  }

  initializeForm(): void {
    this.invoiceForm = this.fb.group({
      invoiceCode: [{ value: `FAC-00${Date.now().toString().slice(-3)}`, disabled: true }, Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      customer: [null, Validators.required], // Cambiado a objeto CustomerDTO
      nit: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      products: this.fb.array([])
    });

    // Actualizar campos relacionados cuando cambie el cliente seleccionado
    this.invoiceForm.get('customer')?.valueChanges.subscribe((customer: CustomerDTO) => {
      if (customer) {
        this.invoiceForm.patchValue({
          nit: customer.document,
          address: customer.residence,
          email: customer.email
        });
      }
    });
  }

  getCustomers(): void {
    this.loadingCustomers = true;
    this.customerService.list().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.filteredCustomers = [...customers];
        this.loadingCustomers = false;
        if (this.selectedInvoice) {
          this.loadInvoiceForEdit();
        }
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.message = 'Error al cargar los clientes';
        this.loadingCustomers = false;
      }
    });
  }

  filterCustomers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(filterValue) ||
      customer.document.toLowerCase().includes(filterValue)
    );
  }

  compareCustomers(c1: CustomerDTO, c2: CustomerDTO): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  loadInvoiceForEdit(): void {
    if (this.selectedInvoice && this.customers.length > 0) {
      const selectedCustomer = this.customers.find(c => c.id === this.selectedInvoice?.client.id) || null;
      this.invoiceForm.patchValue({
        invoiceCode: this.selectedInvoice.invoiceCode,
        date: typeof this.selectedInvoice.date === 'string' ? this.selectedInvoice.date : this.selectedInvoice.date,
        customer: selectedCustomer,
        nit: this.selectedInvoice.nit,
        address: this.selectedInvoice.address,
        email: this.selectedInvoice.email
      });

      while (this.products.length !== 0) {
        this.products.removeAt(0);
      }
      (this.selectedInvoice.itemInvoices || []).forEach((item: ItemInvoiceDTO) => {
        this.products.push(this.fb.group({
          productId: [item.product.id, Validators.required],
          name: [item.product.name, Validators.required],
          unitPrice: [item.unitPrice, [Validators.required, Validators.min(0)]],
          quantity: [item.amountSold, [Validators.required, Validators.min(1)]],
          total: [{ value: item.total, disabled: true }]
        }));
      });
    }
  }

  get products(): FormArray {
    return this.invoiceForm.get('products') as FormArray;
  }

  openAddProductModal(): void {
    const dialogRef = this.dialog.open(InvoiceProductModalComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result: { productId: number; quantity: number; unitPrice: number; total: number; name: string }) => {
      if (result) {
        const productGroup = this.fb.group({
          productId: [result.productId, Validators.required],
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

    const invoice: InvoiceDTO = {
      id: this.selectedInvoice?.id || 0,
      invoiceCode: formValue.invoiceCode,
      client: formValue.customer, // Usar el CustomerDTO seleccionado
      nit: formValue.nit,
      email: formValue.email,
      address: formValue.address,
      date: formValue.date,
      total: subtotal,
      itemInvoices: formValue.products.map((p: any) => ({
        product: { id: p.productId, name: p.name, price: p.unitPrice } as ProductDTO,
        unitPrice: p.unitPrice,
        invoice: null as any,
        amountSold: p.quantity,
        total: p.total
      })),
      status: true,
      cellphone: this.selectedInvoice?.client?.cellPhone || 'N/A',
    };

    console.log("invoice>>: ",invoice)

    if (this.selectedInvoice && this.selectedInvoice.id) {
      this.invoiceService.updateInvoice(this.selectedInvoice.id, invoice).subscribe({
        next: (updatedInvoice) => {
          this.updateInvoice.emit({ id: this.selectedInvoice!.id, invoice: updatedInvoice });
          this.resetForm();
          this.message = 'Factura actualizada exitosamente';
        },
        error: (err) => {
          this.message = 'Error al actualizar la factura';
          console.error('Error al actualizar factura:', err);
        }
      });
    } else {
      this.invoiceService.saveInvoice(invoice).subscribe({
        next: (newInvoice) => {
          this.addInvoice.emit(newInvoice);
          this.resetForm();
          this.message = 'Factura creada exitosamente';
        },
        error: (err) => {
          this.message = 'Error al crear la factura';
          console.error('Error al crear factura:', err);
        }
      });
    }
  }

  resetForm(): void {
    this.invoiceForm.reset();
    this.invoiceForm.patchValue({
      invoiceCode: `FAC-00${Date.now().toString().slice(-3)}`,
      date: new Date().toISOString().split('T')[0]
    });
    while (this.products.length !== 0) {
      this.products.removeAt(0);
    }
    this.message = '';
    this.filteredCustomers = [...this.customers];
  }
}