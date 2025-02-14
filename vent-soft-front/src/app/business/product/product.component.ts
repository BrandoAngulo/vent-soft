import { timer } from 'rxjs';
import { Product } from './product.model';
import { Component, OnInit } from '@angular/core';
import { ProductFormComponent } from "./product-form/product-form.component";
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [UiTableComponent, ProductFormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent implements OnInit {
  products: Product[] = [];
  tableColumns: TableColumn<Product>[] = [];
  isLoadingProduct = true;

  ngOnInit(): void {
    this.getProducts()
    this.setTableColumns()
  }

  getProducts() {
    timer(2000).subscribe(() => {
      this.isLoadingProduct = false
      this.products = [
        {
          id: 1,
          name: 'Celular xiaomy poco x5 pro',
          description: 'Celular inteligente android ',
          itemCode: 1,
          price: 1000.0,
          stock: 1000,
          status: true,
        },
        {
          id: 2,
          name: 'headphones apple',
          description: 'Auriculares de apple',
          itemCode: 2,
          price: 1000.0,
          stock: 1000,
          status: true,
        },
        {
          id: 3,
          name: 'Apple watch',
          description: 'Reloj inteligente de apple',
          itemCode: 2,
          price: 1000.0,
          stock: 1000,
          status: true,
        },
      ]

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
        label: 'Description',
        def: 'description',
        content: (row) => row.description,
      },
      {
        label: 'ItemCode',
        def: 'itemCode',
        content: (row) => row.itemCode,
      },
      {
        label: 'Stock',
        def: 'stock',
        content: (row) => row.stock,
      },
      {
        label: 'Price',
        def: 'price',
        content: (row) => row.price,
      },
      {
        label: 'Status',
        def: 'status',
        content: (row) => row.status,
      },

    ]
  }

  addProduct(product: Product){
    console.log(product);
    this.products = [...this.products, product];
  }
}
