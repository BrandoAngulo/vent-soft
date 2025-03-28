import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserDTO } from '../user.dto';
import { ApiResponse } from '../../../../apiResponse.dto';
import { RolesDTO } from '../user-form/roles.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = environment.apiUrl
  constructor(private http: HttpClient) { }

  //listar usuarios
  list(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.urlBase}/user/find-all`).pipe(map(response => { return response }))
  }

  // Crear nuevo usuario
  create(user: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.urlBase}/user/save`, user)
      .pipe(map(response => response));
  }

  // Actualizar usuario existente
  update(id: number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.urlBase}/user/update/${id}`, user)
      .pipe(map(response => response));
  }

  // Eliminar usuario
  delete(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.urlBase}/user/delete/${id}`)
      .pipe(
        catchError(error => {
          return throwError(() => new Error('Error deleting user'));
        })
      );
  }

  listRoles(): Observable<ApiResponse<string>> {
    return this.http.get<ApiResponse<string>>(`${this.urlBase}/roles/find-all`)
      .pipe(
        map(response => {
          return response
        })
      );
  }

}
