import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice.model';
import { TableColumn } from '../../shared/components/ui-table/ui-table.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  tableColumns: TableColumn<Invoice>[] = [];
  isLoadingProduct = true;
  newInvoice: Invoice;

  constructor() { }

  ngOnInit(): void {
    this.invoices = [
      {
        id: 1,
        invoiceCode: 'FAC-001',
        customer: 'Julian Pelaez',
        nit: '1122333',
        address: 'Calle 25#99-100',
        date: '2025-02-19',
        total: 2500.0,
        products: [
          {
            id: 1,
            itemCode: 10,
            name: 'display',
            description: 'cellphone display',
            price: 10000,
            stock: 100,
            status: true,
          },
          {
            id: 2,
            itemCode: 10,
            name: 'tactil',
            description: 'cellphone tactil',
            price: 5000,
            stock: 50,
            status: true,
          },
        ]
      }
    ];

    this.newInvoice = {
      id: 1,
      invoiceCode: `FAC-${this.invoices.length + 1}`,
      customer: '',
      nit: '',
      address: '',
      date: '',
      total: 0,
      products: [],
    }
  }

}
