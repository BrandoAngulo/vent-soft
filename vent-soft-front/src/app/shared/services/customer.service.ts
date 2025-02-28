import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CustomerDTO } from '../../business/customer/customer.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiCustomerUrl = 'http://localhost:8080/api/vent-soft/client/get-clients';
  constructor(private http: HttpClient) { }

  list(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiCustomerUrl} `).pipe(map(response => {return response}))
  }
}
