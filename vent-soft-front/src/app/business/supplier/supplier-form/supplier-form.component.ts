import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Supplier } from '../supplier.model';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [
        RouterModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule
  ],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent {

@Output() add = new EventEmitter<Supplier>();

  message = "";
  supplierForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.supplierForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      name: [''],
      cellPhone: [''],
      nit: [''],
    })
  }

  addSupplier(){
    if (this.supplierForm.invalid) {
      console.log(this.message= "Creating category erro");
    }else{
      console.log(this.supplierForm.value);
      const supplier: Supplier = { ...this.supplierForm.value };
      this.add.emit(supplier);
      this.supplierForm.reset({
        id: [0],
        name: [''],
        cellPhone: [''],
        nit: [''],
      });
    }
  }
}
