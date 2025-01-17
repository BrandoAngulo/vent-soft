import { Component, OnInit } from '@angular/core';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { Customer } from './customer.model';

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
export default class CustomerComponent implements OnInit{
  customers: Customer[] = [];
  tableColumns: TableColumn<Customer>[] = [];
  isloadingCustomer = true;

  ngOnInit(): void {
    this.getCustomer()
    this.setTableColumns();
  }

  getCustomer() {
    timer(2000).subscribe(() => {
      this.isloadingCustomer = false
      this.customers = [
        {
          id: 1,
          name: 'Armando',
          lastName: 'Casas',
          docType: 'Cedula',
          document: '1122334455',
          city: { id: 1, code: '5511', name: 'cali' },
          residence: 'calle4#200-70',
          cellPhone: '+57-325599666',
          email: 'amigo@gmail.com',
          status: true
        },
        {
          id: 2,
          name: 'Armando',
          lastName: 'Casas',
          docType: 'Cedula',
          document: '1122334455',
          city: { id: 1, code: '5511', name: 'Pablollin' },
          residence: 'calle4#200-70',
          cellPhone: '+57-325599666',
          email: 'amigo@gmail.com',
          status: true
        },
        {
          id: 3,
          name: 'Armando',
          lastName: 'Casas',
          docType: 'Cedula',
          document: '1122334455',
          city: { id: 1, code: '5511', name: 'Tabogo' },
          residence: 'calle4#200-70',
          cellPhone: '+57-325599666',
          email: 'amigo@gmail.com',
          status: true
        }
      ]
    })

  }

  setTableColumns(){
    this.tableColumns =[
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

  addCustomer(customer: Customer) {
    console.log(customer);
    this.customers = [...this.customers, customer];
  }
}
