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
  constructor(private formBuilder: FormBuilder) {
    this.customerForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      name: [''],
      lastName: [''],
      docType: [''],
      document: [''],
      city: [''],
      residence: [''],
      cellPhone: [''],
      email: ['', [Validators.required, Validators.email]],
      status: [true],
    });
  }
  addCustomer() {
    if (this.customerForm.invalid) {
      console.log(this.message = "Creating Customer error");
    } else {
      console.log(this.customerForm.value);
      const customer: CustomerDTO = { ...this.customerForm.value,
        city:{
          id: 0,
          code: '122122',
          name: this.customerForm.value.city,
        }
      }
      this.add.emit(customer);

      //limpiamos formulario
      this.customerForm.reset({
        id: [0],
        name: [''],
        lastName: [''],
        docType: [''],
        document: [''],
        city: [''],
        residence: [''],
        cellPhone: [''],
        email: [''],
      })
    }
  }

}
