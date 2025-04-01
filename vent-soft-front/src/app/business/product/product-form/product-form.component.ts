import { ProductDTO } from '../product.dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CategoryDTO } from '../../category/category.dto';
import { SupplierDTO } from '../../supplier/supplier.dto';
import { CategoryService } from '../../category/services/category.service';
import { SupplierService } from '../../supplier/services/supplier.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnChanges {

  @Output() add = new EventEmitter<ProductDTO>();
  @Input() productEdit: ProductDTO | null = null;
  @Output() update = new EventEmitter<ProductDTO>();

  message = "";
  productForm!: FormGroup;
  submit = false;
  categories: CategoryDTO[] = [];
  filterCategory: CategoryDTO[] = [];
  filterSupplier: SupplierDTO[] = [];
  suppliers: SupplierDTO[] = [];
  loadCategories = false;
  loadSuppliers = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private supplierService: SupplierService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      itemCode: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      supplier: [''],
      category: [''],
      description: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      stock: ['', [Validators.required, Validators.min(1)]],
      status: true,
    });
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSuppliers();
    this.loadProductData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productEdit'] && this.categories.length > 0
      && this.suppliers.length > 0) {
      this.loadProductData();
    }
  }

  loadProductData() {
    if (this.productEdit && this.categories.length > 0
      && this.suppliers.length > 0) {
      this.productForm.patchValue({
        name: this.productEdit.name,
        itemCode: this.productEdit.itemCode,
        description: this.productEdit.description,
        price: this.productEdit.price,
        stock: this.productEdit.stock,
        category: this.categories.find(category => category.id === this.productEdit?.category.id) || '',
        supplier: this.suppliers.find(supplier => supplier.id === this.productEdit?.supplier.id) || '',
      });
    } else {
      this.productForm.reset({
        name: '',
        itemCode: 0,
        description: '',
        price: 0.0,
        stock: 0,
        category: '',
        supplier: '',
        status: true,
      });
    }
    // Inicializar categoriasFiltradas con todas las categorías
    this.filterCategory = [...this.categories];
    // Inicializar suppliersFiltrados con todos los vendedores
    this.filterSupplier = [...this.suppliers];
  }

  getCategories() {
    this.loadCategories = true;
    this.categoryService.list().subscribe({
      next: (category) => {
        this.categories = category;
        this.filterCategory = [...this.categories]; // Inicializar lista filtrada
        this.loadCategories = false;
        this.loadProductData();
        console.log(this.categories = category);
      },
      error: (err) => {
        console.error('Error al cargar categorias:', err);
        this.message = "Error al cargar las categorias";
        this.loadCategories = false;
      }
    });
  }

  getSuppliers() {
    this.loadSuppliers = true;
    this.supplierService.list().subscribe({
      next: (supplier) => {
        this.suppliers = supplier;
        this.filterSupplier = [...this.suppliers];
        this.loadSuppliers = false;
        this.loadProductData();
        console.log(this.suppliers = supplier);
      },
      error: (err) => {
        console.error('Error loading suppliers: ', err);
        this.message = "Error loading suppliers";
        this.loadSuppliers = false;
      },
    });
  }

  compareSuppliers(supplier: SupplierDTO, supplier1: SupplierDTO): boolean {
    return supplier && supplier1 ? supplier.id === supplier1.id : supplier === supplier1;
  }

  compareCategories(category: CategoryDTO, categories1: CategoryDTO): boolean {
    return category && categories1 ? category.id === categories1.id : category === categories1;
  }

  filterCategories(evento: Event): void {
    const filterValue = (evento.target as HTMLInputElement).value.toLowerCase();
    this.filterCategory = this.categories.filter(category =>
      category.description.toLowerCase().includes(filterValue) ||
      category.id.toString().includes(filterValue)
    );
  }

  filterSuppliers(evento: Event): void {
    const filterValue = (evento.target as HTMLInputElement).value.toLowerCase();
    this.filterSupplier = this.suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(filterValue) ||
      supplier.id.toString().includes(filterValue)
    );
  }

  addProduct() {
    if (this.productForm.invalid) {
      this.message = "Formulario inválido. Por favor, completa todos los campos requeridos.";
      console.log(this.message);
      return;
    }

    this.submit = true;
    const formValue = this.productForm.value;

    const product: ProductDTO = {
      ...formValue,
      id: this.productEdit?.id,
      status: true,
      category: formValue.category,
      supplier: formValue.supplier,
    };

    if (this.productEdit) {
      console.log("actualizar");
      this.update.emit(product);
    } else {
      console.log("agregar");
      this.add.emit(product);
    }
    this.submit = false;
    this.productForm.reset({
      name: '',
      itemCode: 0,
      description: '',
      price: 0.0,
      stock: 0,
      category: '',
      supplier: '',
      status: true,
    });
    this.filterCategory = [...this.categories];
    this.filterSupplier = [...this.suppliers];
  }
}
