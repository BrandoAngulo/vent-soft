import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { ProductDTO } from '../product.dto';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../../../apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlBase = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //Listar productos
  list(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.urlBase}/product/find-all`).pipe(map(response => { return response }))
  }

  // Crear un nuevo producto
  create(product: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.urlBase}/product/save`, product)
      .pipe(map(response => response));
  }

  // Actualizar un producto existente
  update(id: number, product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${this.urlBase}/product/update/${id}`, product)
      .pipe(map(response => response));
  }

  // Eliminar un producto
  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.urlBase}/product/delete/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting product:', error);
          return throwError(() => new Error('Error deleting product'));
        })
      );
  }

}
