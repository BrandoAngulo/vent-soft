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

  /*

   // Obtener un cliente por ID
  getById(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.urlBase}/client/get-client/${id}`)
      .pipe(map(response => response));
  }

  // Obtener clientes por nombre y apellido
  getByName(name: string, lastName: string): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.urlBase}/client/get-clients-by-name`, {
      params: {
        name: name,
        lastName: lastName
      }
    }).pipe(map(response => response));
  }

  // Actualizar un cliente existente
  update(id: number, client: CustomerDTO): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.urlBase}/client/update/${id}`, client)
      .pipe(map(response => response));
  }

  // Eliminar un cliente
  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.urlBase}/client/delete/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting user:', error);
          return throwError(() => new Error('Error deleting user'));
        })
      );
  }
 */}
