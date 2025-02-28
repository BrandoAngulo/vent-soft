import { Component, inject, OnInit } from '@angular/core';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerDTO } from './customer.model';
import { CustomerService } from '../../shared/services/customer.service';
import { error } from 'console';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    UiTableComponent,
    CustomerFormComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export default class CustomerComponent implements OnInit {
  customers: CustomerDTO[] = [];
  tableColumns: TableColumn<CustomerDTO>[] = [];
  isloadingCustomer = true;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomer()
    this.setTableColumns();
  }

  getCustomer() {
    this.customerService.list().subscribe((customer) => {
      this.isloadingCustomer = false
      this.customers = customer;
    }, (error) => {
      console.error('List customer Error :', error)
    })
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },
      {
        label: 'Name',
        def: 'name',
        content: (row) => row.name,
      },
      {
        label: 'LastName',
        def: 'lastName',
        content: (row) => row.lastName,
      },
      {
        label: 'DocType',
        def: 'docType',
        content: (row) => row.docType,
      },
      {
        label: 'City',
        def: 'city',
        content: (row) => row.city?.name || 'N/A',
      },
      {
        label: 'Residence',
        def: 'residence',
        content: (row) => row.residence,
      },
      {
        label: 'CellPhone',
        def: 'cellPhone',
        content: (row) => row.cellPhone,
      },
      {
        label: 'Email',
        def: 'email',
        content: (row) => row.email,
      },
      {
        label: 'Status',
        def: 'status',
        content: (row) => row.status,
      },
    ]
  }

  addCustomer(customer: CustomerDTO) {
    console.log(customer);
    this.customers = [...this.customers, customer];
  }
}
