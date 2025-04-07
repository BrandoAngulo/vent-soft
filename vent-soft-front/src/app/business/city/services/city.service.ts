import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../enviroments/enviroment';
import { CityDTO } from '../city.dto';
import { ApiResponse } from '../../../../apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private urlBase = environment.apiUrl;
  constructor(private http: HttpClient) { }

  list(): Observable<CityDTO[]> {
    return this.http.get<CityDTO[]>(`${this.urlBase}/city/find-all`).pipe(map(response => { return  response }))
  }

  // Crear un nuevo city
  create(city: CityDTO): Observable<CityDTO> {
    return this.http.post<CityDTO>(`${this.urlBase}/city/save`, city)
      .pipe(map(response => response));
  }

  // Actualizar un cliente existente
  update(id: number, city: CityDTO): Observable<CityDTO> {
    return this.http.put<CityDTO>(`${this.urlBase}/city/update/${id}`, city)
      .pipe(map(response => response));
  }

  // Eliminar un cliente
  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.urlBase}/city/delete/${id}`)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Error deleting city'));
        })
      );
  }

 }
