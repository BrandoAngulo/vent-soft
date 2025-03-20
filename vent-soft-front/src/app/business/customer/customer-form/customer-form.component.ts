import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CustomerDTO } from '../customer.dto';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
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
  constructor(private formBuilder: FormBuilder) {
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
      city: {
        id: 2, // Esto podría venir de un selector de ciudades en el futuro
      }
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
