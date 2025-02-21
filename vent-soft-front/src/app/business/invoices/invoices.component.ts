import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice.model';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { InvoiceFormComponent } from "./invoice-form/invoice-form.component";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [InvoiceFormComponent, UiTableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];
  tableColumns: TableColumn<Invoice>[] = [];
  isLoadingInvoices = true;
  //newInvoice: Invoice;

  constructor() { }

  ngOnInit(): void {
    this.getInvoices();
    this.setTableColumns()

/*     this.newInvoice = {
      id: 1,
      invoiceCode: `FAC-${this.invoices.length + 1}`,
      customer: '',
      nit: '',
      address: '',
      date: '',
      total: 0,
      products: [],
    } */
  }
  getInvoices() {
    timer(2000).subscribe(() => {
      this.isLoadingInvoices = false
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
    })
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },
      {
        label: 'Invoice code',
        def: 'invoiceCode',
        content: (row) => row.invoiceCode,
      },
      {
        label: 'Customer',
        def: 'customer',
        content: (row) => row.customer,
      },
      {
        label: 'Nit',
        def: 'nit',
        content: (row) => row.nit,
      },
      {
        label: 'Address',
        def: 'address',
        content: (row) => row.address,
      },
      {
        label: 'Date',
        def: 'date',
        content: (row) => row.date,
      },
      {
        label: 'Total',
        def: 'total',
        content: (row) => row.total,
      },

      {
        label: 'Products',
        def: 'products',
        /* row.products.map(product => product.name): Obtiene solo los nombres de los productos.
        .join(', '): Une los nombres en una sola cadena separada por comas.
        */
        content: (row) => row.products?.map(product => product.name).join(', ') || '',
      },
    ]
  }

  addInvoice(invoice: Invoice){
      console.log(invoice);
      this.invoices = [...this.invoices, invoice];
    }



}
