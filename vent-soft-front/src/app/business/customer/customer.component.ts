import { CustomerDTO } from './customer.dto';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { ApiResponse } from '../../../apiResponse.dto';

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
    this.isloadingCustomer = true;
    this.customerService.list().subscribe({
      next: (customer) => {
        this.customers = customer;
        this.isloadingCustomer = false
      },
      error: (err) => {
        console.error('List customer Error :', err),
        this.isloadingCustomer = false;
      }
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
        def: 'docTipe',
        content: (row) => row.docTipe,
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

  isAddingCustomer = false;

  addCustomer(customer: CustomerDTO) {
    this.isAddingCustomer = true;
    this.customerService.create(customer).subscribe({
      next: (newCustomer) => {
        this.getCustomer();
        //this.customers = [...this.customers, newCustomer];
        console.log('Cliente creado exitosamente:', newCustomer);
        this.isAddingCustomer = false;
      },
      error: (err) => {
        console.error('Error al crear cliente:', err);
        this.isAddingCustomer = false;
      }
    });
  }

  editCustomer(customer: CustomerDTO): void {
    console.log('Editar factura', customer);
    // Lógica para editar la factura
  }

  deleteCustomer(customer: CustomerDTO): void {
    if (!customer.id) {
      console.error('Customer not found');
      return;
    }

    this.customerService.delete(customer.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.customers = this.customers.filter(c => c.id !== customer.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`);
      },
      error: (err) => {
        console.error('Customer deleted error: ', err);
      }
    });
  }
}
