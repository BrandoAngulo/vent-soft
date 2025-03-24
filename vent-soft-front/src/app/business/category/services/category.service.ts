import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CategoryDTO } from '../category.dto';
import { ApiResponse } from '../../../../apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private urlBase = environment.apiUrl
  constructor(private http: HttpClient) { }

  //listar categorias
  list(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(`${this.urlBase}/category/find-all`).pipe(map(response => { return response }))
  }

  // Crear una nueva categoria
  create(category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(`${this.urlBase}/category/save`, category)
      .pipe(map(response => response));
  }

  // Actualizar una categoria existente
  update(id: number, category: CategoryDTO): Observable<CategoryDTO> {
    return this.http.put<CategoryDTO>(`${this.urlBase}/category/update/${id}`, category)
      .pipe(map(response => response));
  }

  // Eliminar una categoria
  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.urlBase}/category/delete/${id}`)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Error deleting category'));
        })
      );
  }
  
}
