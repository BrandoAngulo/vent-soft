import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';
import { CustomerDTO } from '../../business/customer/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private urlBase = environment.apiUrl;
  constructor(private http: HttpClient) { }

  list(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.urlBase}/client/get-clients`).pipe(map(response => {return response}))
  }
}
