import { timer } from 'rxjs';
import { Invoice } from './invoice.model';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { UiTableComponent, TableColumn } from '../../../shared/components/ui-table/ui-table.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    InvoiceFormComponent,
    UiTableComponent,
    MatCardModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export default class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  isLoadingInvoices: boolean = true;
  tableColumns: TableColumn<Invoice>[] = [];

  ngOnInit(): void {
    // Ejemplo de factura inicial
    timer(2000).subscribe(() => {
          this.isLoadingInvoices = false
    this.invoices = [
      {
        id: 1,
        invoiceCode: 'FAC-001',
        customer: 'Juan Pérez',
        nit: '123456789',
        address: 'Calle 123',
        date: '2024-02-18',
        total: 250.0,
        products: [
          { name: 'Producto A', unitPrice: 50, quantity: 2, total: 100 },
          { name: 'Producto B', unitPrice: 75, quantity: 2, total: 150 }
        ]
      }
    ];
  })
    this.setTableColumns();
  }

  setTableColumns(): void {
    this.tableColumns = [
      { label: 'ID', def: 'id', content: (row: Invoice) => row.id },
      { label: 'Código', def: 'invoiceCode', content: (row: Invoice) => row.invoiceCode },
      { label: 'Cliente', def: 'customer', content: (row: Invoice) => row.customer },
      { label: 'NIT', def: 'nit', content: (row: Invoice) => row.nit },
      { label: 'Dirección', def: 'address', content: (row: Invoice) => row.address },
      { label: 'Fecha', def: 'date', content: (row: Invoice) => row.date },
      { label: 'Total', def: 'total', content: (row: Invoice) => row.total }
    ];
  }

  onAddInvoice(newInvoice: Invoice): void {
    newInvoice.id = this.invoices.length + 1;
    this.invoices = [...this.invoices, newInvoice];
  }
}
