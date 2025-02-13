import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiTableComponent, TableColumn } from '../../shared/components/ui-table/ui-table.component';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { Supplier } from './supplier.model';
import { timer } from 'rxjs';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    UiTableComponent,
    MatProgressSpinnerModule,
    CommonModule,
    SupplierFormComponent
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export default class SupplierComponent implements OnInit{
  suppliers: Supplier[] = [];
  tableColumns: TableColumn<Supplier>[] = [];
  isLoadingSupplier = true;

  ngOnInit(): void {
    this.getSuppliers();
    this.setTableColumns();
  }

  getSuppliers(){
    console.log(`Suppliers: ${this.suppliers}`)
    console.log(`isLoadingSupplier: ${this.isLoadingSupplier}`)
    timer(2000).subscribe(()=>{
      this.isLoadingSupplier = true;
      this.suppliers = [
        {
          id: 1,
          name: "chinaRepost",
          cellPhone: "33225141444",
          nit: "123123123",
        },
        {
          id: 2,
          name: "chinaRepost",
          cellPhone: "33225141444",
          nit: "123123123",
        },
        {
          id: 3,
          name: "chinaRepost",
          cellPhone: "33225141444",
          nit: "123123123",
        },

      ]
    })
  }

  setTableColumns(){
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },

      {
        label: 'Name',
        def: 'name',
        content: (row) => row.name
      },

      {
        label: 'CellPhone',
        def: 'cellPhone',
        content: (row) => row.cellPhone
      },

      {
        label: 'Nit',
        def: 'nit',
        content: (row) => row.nit
      },

    ]

  }

  addSupplier(supplier: Supplier){
    console.log(supplier);
    this.suppliers = [...this.suppliers, supplier];
  }

}
