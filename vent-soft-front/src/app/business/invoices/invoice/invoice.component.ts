import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { UiTableComponent, TableColumn } from '../../../shared/components/ui-table/ui-table.component';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../services/invoice.service';
import { ApiResponse } from '../../../../apiResponse.dto';
import { InvoiceDTO } from './invoice.dto';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceFormComponent,
    UiTableComponent,
    MatCardModule,
  ],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export default class InvoicesComponent implements OnInit {
  invoices: InvoiceDTO[] = [];
  loadingInvoices: boolean = true;
  tableColumns: TableColumn<InvoiceDTO>[] = [];
  selectedInvoice: InvoiceDTO | null = null;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.setTableColumns();
    this.getInvoices();
  }

  getInvoices() {
    this.loadingInvoices = true;
    this.invoiceService.list().subscribe({
      next: (invoices) => {
        this.invoices = invoices;
        this.loadingInvoices = false;
      },
      error: (err) => {
        console.error('List invoices error: ', err);
        this.loadingInvoices = false;
      }
    });
  }

  setTableColumns(): void {
    this.tableColumns = [
      { label: 'ID', def: 'id', content: (row) => row.id },
      { label: 'Código', def: 'invoiceCode', content: (row) => row.invoiceCode },
      { label: 'Cliente', def: 'client', content: (row) => row.client?.name || 'N/A' },
      { label: 'NIT', def: 'nit', content: (row) => row.client.document },
      { label: 'Dirección', def: 'address', content: (row) => row.client.residence },
      { label: 'Fecha', def: 'date', content: (row) => row.date },
      { label: 'Total', def: 'total', content: (row) => row.total },
      { label: 'Estado', def: 'status', content: (row) => row.status },
      { label: 'Acciones', def: 'acciones', content: () => '' }
    ];
  }

  addInvoice(invoice: InvoiceDTO): void {
    this.invoiceService.saveInvoice(invoice).subscribe({
      next: (newInvoice) => {
        this.getInvoices();
        this.selectedInvoice = null;
        console.log('Factura creada exitosamente:', newInvoice);
      },
      error: (err) => {
        console.error('Error al crear factura:', err);
      }
    });
  }

  updateInvoice(event: { id: number; invoice: InvoiceDTO }): void {
    this.invoiceService.updateInvoice(event.id, event.invoice).subscribe({
      next: (result) => {
        this.getInvoices();
        this.selectedInvoice = null;
        console.log('Factura actualizada exitosamente:', result);
      },
      error: (err) => {
        console.error('Error al actualizar factura:', err);
      }
    });
  }

  editInvoice(invoice: InvoiceDTO): void {
    this.selectedInvoice = { ...invoice };
  }

  cancelInvoice(invoice: InvoiceDTO): void {
    if (!invoice.id) {
      console.error('Factura no encontrada');
      return;
    }
    this.invoiceService.cancelInvoice(invoice.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.invoices = this.invoices.filter(i => i.id !== invoice.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`);
      },
      error: (err) => {
        console.error('Error al anular la factura: ', err);
      }
    });
  }
}