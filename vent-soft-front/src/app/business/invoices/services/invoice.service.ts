import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InvoiceDTO } from '../invoice/invoice.dto';
import { ApiResponse } from '../../../../apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private urlBase = `${environment.apiUrl}/invoice`;

  constructor(private http: HttpClient) { }

  // Obtener todas las facturas
  list(): Observable<InvoiceDTO[]> {
    return this.http.get<InvoiceDTO[]>(`${this.urlBase}/get-invoices`)
      .pipe(map(response => response));
  }

  // Obtener factura por ID
  lisInvoice(id: number): Observable<InvoiceDTO> {
    return this.http.get<InvoiceDTO>(`${this.urlBase}/get-invoice/${id}`)
      .pipe(map(response => response));
  }

  // Crear nueva factura
  saveInvoice(invoice: InvoiceDTO): Observable<InvoiceDTO> {
    return this.http.post<InvoiceDTO>(`${this.urlBase}/save-invoice`, invoice)
      .pipe(map(response => response));
  }

  // Actualizar factura existente
  updateInvoice(id: number, invoice: InvoiceDTO) {
    return this.http.put<InvoiceDTO>(`${this.urlBase}/update-invoice/${id}`, invoice)
      .pipe(map(response => response));
  }

  // anular factura
  cancelInvoice(id: number): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${this.urlBase}/cancel-invoice/${id}`, null)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error al anular la factura:', error);
          return throwError(() => new Error('Error al anular la factura'));
        })
      );
  }

  // Obtener facturas por ID de cliente
  getInvoicesByCustomerId(customerId: number): Observable<InvoiceDTO[]> {
    return this.http.get<InvoiceDTO[]>(`${this.urlBase}/invoices-customer-id/${customerId}`)
      .pipe(map(response => response));
  }
}
