import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient)

  constructor() { }

  list(){
    return this.http.get('http://localhost:8080/api/vent-soft/client/get-clients')
  }
}
