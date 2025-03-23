import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SupplierDTO } from '../supplier.dto';
import { ApiResponse } from '../../../../apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private urlBase = environment.apiUrl
    constructor(private http: HttpClient) { }
  
    //listar Proveedors
    list(): Observable<SupplierDTO[]> {
      return this.http.get<SupplierDTO[]>(`${this.urlBase}/supplier/find-all`).pipe(map(response => { return response }))
    }
  
    // Crear una nueva Proveedor
    create(supplier: SupplierDTO): Observable<SupplierDTO> {
      return this.http.post<SupplierDTO>(`${this.urlBase}/supplier/save`, supplier)
        .pipe(map(response => response));
    }
  
    // Actualizar una Proveedor existente
    update(id: number, supplier: SupplierDTO): Observable<SupplierDTO> {
      return this.http.put<SupplierDTO>(`${this.urlBase}/supplier/update/${id}`, supplier)
        .pipe(map(response => response));
    }
  
    // Eliminar una Proveedor
    delete(id: number): Observable<ApiResponse<string>> {
      return this.http.delete<ApiResponse<string>>(`${this.urlBase}/supplier/delete/${id}`)
        .pipe(
          catchError(error => {
            return throwError(() => new Error('Error deleting supplier'));
          })
        );
    }
}
