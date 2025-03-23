import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CustomerDTO } from '../customer.dto';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CityDTO } from '../../city/city.dto';
import { CityService } from '../../city/services/city.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit, OnChanges {
  @Input() customerEdit: CustomerDTO | null = null;
  @Output() add = new EventEmitter<CustomerDTO>();
  @Output() update = new EventEmitter<CustomerDTO>();

  message = "";
  customerForm!: FormGroup;
  isSubmitting = false;
  cities: CityDTO[] = [];
  isLoadingCities = false;

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService
  ) {
    this.customerForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      docTipe: [''],
      document: [''],
      city: [''],
      residence: [''],
      cellPhone: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getCities();
    this.loadCustomerData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerEdit'] && this.cities.length > 0) {
      this.loadCustomerData();
    }
  }

  loadCustomerData() {
    if (this.customerEdit && this.cities.length > 0) {
      this.customerForm.patchValue({
        name: this.customerEdit.name,
        lastName: this.customerEdit.lastName,
        docTipe: this.customerEdit.docTipe,
        document: this.customerEdit.document,
        city: this.cities.find(city => city.id === this.customerEdit?.city?.id) || '',
        residence: this.customerEdit.residence,
        cellPhone: this.customerEdit.cellPhone,
        email: this.customerEdit.email
      });
    } else {
      this.customerForm.reset({
        name: '',
        lastName: '',
        docTipe: '',
        document: '',
        city: '',
        residence: '',
        cellPhone: '',
        email: '',
        status: true
      });
    }
  }

  getCities() {
    this.isLoadingCities = true;
    this.cityService.list().subscribe({
      next: (city) => {
        this.cities = city;
        this.isLoadingCities = false;
        this.loadCustomerData();
        console.log(this.cities = city);
      },
      error: (err) => {
        console.error('Error al cargar ciudades:', err);
        this.message = "Error al cargar las ciudades";
        this.isLoadingCities = false;
      }
    });
  }

  compareCities(city1: CityDTO, city2: CityDTO): boolean {
    return city1 && city2 ? city1.id === city2.id : city1 === city2;
  }

  addCustomer() {
    if (this.customerForm.invalid) {
      this.message = "Formulario inválido. Por favor, completa todos los campos requeridos.";
      console.log(this.message);
      return;
    }

    this.isSubmitting = true;
    const formValue = this.customerForm.value;

    const customer: CustomerDTO = {
      ...formValue,
      id: this.customerEdit?.id,
      status: true,
      city: formValue.city
    };

    if (this.customerEdit) {
      console.log("actualizar");
      this.update.emit(customer);
    } else {
      console.log("agregar");
      this.add.emit(customer);
    }
    this.isSubmitting = false;
    this.customerForm.reset({
      name: '',
      lastName: '',
      docTipe: '',
      document: '',
      city: '',
      residence: '',
      cellPhone: '',
      email: '',
      status: true
    });
  }
}