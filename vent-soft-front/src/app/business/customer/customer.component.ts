import { CustomerDTO } from './customer.dto';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';

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
    this.customerService.list().subscribe({
      next: (customer) => {
        this.isloadingCustomer = false
        this.customers = customer;
      },
      error: (err) => console.error('List customer Error :', err),
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
      { label: 'Acciones', def: 'acciones', content: () => '' }
    ]
  }

  addCustomer(customer: CustomerDTO) {
    console.log(customer);
    this.customers = [...this.customers, customer];
  }

  editCustomer(customer: CustomerDTO): void {
    console.log('Editar factura', customer);
    // Lógica para editar la factura
  }

  deleteCustomer(customer: CustomerDTO): void {
    console.log('Eliminar factura', customer);
    // Lógica para eliminar la factura
  }
}
