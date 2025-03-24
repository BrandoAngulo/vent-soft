import { timer } from 'rxjs';
import { ProductDTO } from './product.dto';
import { Component, OnInit } from '@angular/core';
import { ProductFormComponent } from "./product-form/product-form.component";
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product.service';
import { ApiResponse } from '../../../apiResponse.dto';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    ProductFormComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent implements OnInit {
  products: ProductDTO[] = [];
  tableColumns: TableColumn<ProductDTO>[] = [];
  loadingProduct = true;
  selectedProduct: ProductDTO | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts()
    this.setTableColumns()
  }

  getProducts() {
    this.loadingProduct = true;
    this.productService.list().subscribe({
      next: (product) => {
        this.products = product;
        this.loadingProduct = false;
      },
      error: (err) => {
        console.error('List product error: ', err),
          this.loadingProduct = false;
      }
    });
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
        label: 'Categoria',
        def: 'category',
        content: (row) => row.category?.description || 'N/A',
      },
      {
        label: 'Vendedor',
        def: 'supplier',
        content: (row) => row.supplier?.name || 'N/A',
      },
      {
        label: 'Descripcion',
        def: 'description',
        content: (row) => row.description,
      },
      {
        label: 'Codigo',
        def: 'itemCode',
        content: (row) => row.itemCode,
      },
      {
        label: 'Inventario',
        def: 'stock',
        content: (row) => row.stock,
      },
      {
        label: 'Precio',
        def: 'price',
        content: (row) => row.price,
      },
      {
        label: 'Estado',
        def: 'status',
        content: (row) => row.status,
      },
      {
        label: 'Acciones',
        def: 'acciones',
        content: () => '',
      },

    ]
  }

  addProduct(product: ProductDTO) {
    this.productService.create(product).subscribe({
      next: (newProduct) => {
        this.getProducts();
        this.selectedProduct = null; // Reinicia el formulario después de agregar
        console.log('Producto creado exitosamente:', newProduct);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);
      }
    });
  }

  editProduct(product: ProductDTO): void {
    this.selectedProduct = { ...product }; // Clonar el objeto para evitar mutaciones directas
  }

  deleteProduct(product: ProductDTO): void {
    if (!product.id) {
      console.error('Product not found');
      return;
    }
    this.productService.delete(product.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.products = this.products.filter(p => p.id !== product.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`);
      },
      error: (err) => {
        console.error('Product deleted error: ', err);
      }
    });
  }

    updateProduct(product: ProductDTO): void {
      if (!product.id) {
        console.error('product ID not found');
        return;
      }
      this.productService.update(product.id, product).subscribe({
        next: (updatedproduct) => {
          this.getProducts(); // Refrescar la lista
          this.selectedProduct = null; // Limpiar selección
          console.log('producto actualizado exitosamente:', updatedproduct);
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
        }
      });
    }

    updateProductStatus(product: ProductDTO): void {
        if (!product.id) {
          console.error('Customer ID not found');
          return;
        }
    
        this.productService.update(product.id, product).subscribe({
          next: (updatedProduct) => {
            this.getProducts(); // Refrescar la lista
            this.selectedProduct = null; // Limpiar selección
            console.log('Producto actualizado exitosamente:', updatedProduct);
          },
          error: (err) => {
            console.error('Error al actualizar estado:', err);
            // Si hay error, podrías revertir el cambio en la UI
            const index = this.products.findIndex(c => c.id === product.id);
            if (index !== -1) {
              this.products[index].status = !product.status; // Revertir el cambio
              this.products = [...this.products]; // Forzar actualización
            }
          }
        });
      }

}
