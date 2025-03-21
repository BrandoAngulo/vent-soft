import { Component, EventEmitter, Output } from '@angular/core';
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
export class CustomerFormComponent {
  @Output() add = new EventEmitter<CustomerDTO>();
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
  }

  getCities(){
    this.isLoadingCities = true;
    this.cityService.list().subscribe({
      next: (city) =>{
        this.cities = city;
        this.isLoadingCities = false;
        console.log(this.cities = city)
      },
      error: (err) => {
        console.error('Error loading cities:', err);
        this.message = "Error al cargar las ciudades";
        this.isLoadingCities = false;
      }
    })
  }
  // Comparador para mat-select (necesario para objetos)
  compareCities(city1: CityDTO, city2: CityDTO): boolean {
    return city1 && city2 ? city1.id === city2.id : city1 === city2;
  }
  
  addCustomer() {
    console.log(this.customerForm)
    if (this.customerForm.invalid) {
      this.message = "Formulario inválido. Por favor, completa todos los campos requeridos.";
      console.log(this.message);
      return;
    }

    this.isSubmitting = true;
    const formValue = this.customerForm.value;

    const customer: CustomerDTO = {
      ...formValue,
      status: true,
      city: formValue.city
    };
      this.add.emit(customer);

      //limpiamos formulario
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
      this.isSubmitting = false;
    this.message = "Cliente enviado para creación";
    }
  }
