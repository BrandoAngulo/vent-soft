import { CustomerDTO } from './customer.dto';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { ApiResponse } from '../../../apiResponse.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
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
  selectedCustomer: CustomerDTO | null = null; // Cliente seleccionado para edición

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
        label: 'Nombre',
        def: 'name',
        content: (row) => row.name,
      },
      {
        label: 'Segundo nombre',
        def: 'lastName',
        content: (row) => row.lastName,
      },
      {
        label: 'Tipo documento',
        def: 'docTipe',
        content: (row) => row.docTipe,
      },
      {
        label: 'Ciudad',
        def: 'city',
        content: (row) => row.city?.name || 'N/A',
      },
      {
        label: 'Residencia',
        def: 'residence',
        content: (row) => row.residence,
      },
      {
        label: 'Celular',
        def: 'cellPhone',
        content: (row) => row.cellPhone,
      },
      {
        label: 'Correo',
        def: 'email',
        content: (row) => row.email,
      },
      {
        label: 'Estado',
        def: 'status',
        content: (row) => row.status,
      },
      { label: 'Acciones', def: 'acciones', content: () => '' }
    ]
  }

  addCustomer(customer: CustomerDTO) {
    this.customerService.create(customer).subscribe({
      next: (newCustomer) => {
        this.getCustomer();
        this.selectedCustomer = null; // Reinicia el formulario después de agregar
        console.log('Cliente creado exitosamente:', newCustomer);
      },
      error: (err) => {
        console.error('Error al crear cliente:', err);
      }
    });
  }

  editCustomer(customer: CustomerDTO): void {
    this.selectedCustomer = { ...customer }; // Clonar el objeto para evitar mutaciones directas
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

  updateCustomer(customer: CustomerDTO): void {
    if (!customer.id) {
      console.error('Customer ID not found');
      return;
    }
    this.customerService.update(customer.id, customer).subscribe({
      next: (updatedCustomer) => {
        this.getCustomer(); // Refrescar la lista
        this.selectedCustomer = null; // Limpiar selección
        console.log('Cliente actualizado exitosamente:', updatedCustomer);
      },
      error: (err) => {
        console.error('Error al actualizar cliente:', err);
      }
    });
  }

  updateCustomerStatus(customer: CustomerDTO): void {
    if (!customer.id) {
      console.error('Customer ID not found');
      return;
    }

    this.customerService.update(customer.id, customer).subscribe({
      next: (updatedCustomer) => {
        this.getCustomer(); // Refrescar la lista
        this.selectedCustomer = null; // Limpiar selección
        console.log('Cliente actualizado exitosamente:', updatedCustomer);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        // Si hay error, podrías revertir el cambio en la UI
        const index = this.customers.findIndex(c => c.id === customer.id);
        if (index !== -1) {
          this.customers[index].status = !customer.status; // Revertir el cambio
          this.customers = [...this.customers]; // Forzar actualización
        }
      }
    });
  }

}
