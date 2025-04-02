import { timer } from 'rxjs';
import { SupplierDTO } from './supplier.dto';
import { Component, OnInit } from '@angular/core';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { UiTableComponent, TableColumn } from '../../shared/components/ui-table/ui-table.component';
import { CommonModule } from '@angular/common';
import { SupplierService } from './services/supplier.service';
import { ApiResponse } from '../../../apiResponse.dto';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    SupplierFormComponent
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export default class SupplierComponent implements OnInit {
  suppliers: SupplierDTO[] = [];
  tableColumns: TableColumn<SupplierDTO>[] = [];
  loadingSupplier = true;
  selectedSupplier: SupplierDTO | null = null;

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getSuppliers();
    this.setTableColumns();
  }

  getSuppliers() {
    this.loadingSupplier = true;
    this.supplierService.list().subscribe({
      next: (supplier) => {
        this.suppliers = supplier;
        this.loadingSupplier = false;
      },
      error: (err) => {
        console.error('Error loading suppliers: ', err)
        this.loadingSupplier = false;
      },
    });
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Razon social',
        def: 'name',
        content: (row) => row.name
      },

      {
        label: 'Celular',
        def: 'cellPhone',
        content: (row) => row.cellPhone
      },

      {
        label: 'Nit',
        def: 'nit',
        content: (row) => row.nit
      },

      {
        label: 'Estado',
        def: 'status',
        content: (row) => row.status,
      },

      {
        label: 'Acciones',
        def: 'acciones',
        content: () => ''
      }

    ]

  }

  addSupplier(supplier: SupplierDTO) {
    console.log(supplier);
    this.supplierService.create(supplier).subscribe({
      next: (newSupplier) => {
        this.getSuppliers();
        this.selectedSupplier = null
        console.log("vendedor creado exitosamente", newSupplier);
      },
      error: (err) => {
        console.error("error al crear el vendedor: ", err);
      },
    })
  }

  editSupplier(supplierDTO: SupplierDTO): void {
    this.selectedSupplier = { ...supplierDTO };
  }

  deleteSupplier(supplierDTO: SupplierDTO): void {
    if (!supplierDTO.id) {
      console.error('Supplier not found');
      return;
    }
    this.supplierService.delete(supplierDTO.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.suppliers = this.suppliers.filter(supplier => supplier.id !== supplierDTO.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`)
      },
      error: (err) => {
        console.error('Supplier deleted error: ', err);
      },
    });
  }

  updateSupplier(supplierDTO: SupplierDTO): void {
    if (!supplierDTO) {
      console.error("Supplier not found")
      return;
    }
    this.supplierService.update(supplierDTO.id, supplierDTO).subscribe({
      next: (updateSupplier) => {
        this.getSuppliers();
        this.selectedSupplier = null;
        console.log("Supplier updated successfull: ", updateSupplier)
      },
      error: (err) => {
        console.error('Error al actualizar el vendedor: ', err);
      },
    })
  }

  updateSupplierStatus(supplierDTO: SupplierDTO): void {
    if (!supplierDTO.id) {
      console.error('ID not found');
      return;
    }

    this.supplierService.update(supplierDTO.id, supplierDTO).subscribe({
      next: (updateSupplier) => {
        this.getSuppliers(); // Refrescar la lista
        this.selectedSupplier = null; // Limpiar selección
        console.log('Supplier actualizado exitosamente:', updateSupplier);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        // Si hay error, podrías revertir el cambio en la UI
        const index = this.suppliers.findIndex(supplier => supplier.id === supplierDTO.id);
        if (index !== -1) {
          this.suppliers[index].status = !supplierDTO.status; // Revertir el cambio
          this.suppliers = [...this.suppliers]; // Forzar actualización
        }
      }
    });
  }

}
