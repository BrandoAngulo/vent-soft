import { City } from '../city.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-form',
  standalone: true,
  imports: [
        CommonModule,
        RouterModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
  ],
  templateUrl: './city-form.component.html',
  styleUrl: './city-form.component.css'
})
export class CityFormComponent {
  @Output() add = new EventEmitter<City>();
    message = "";
    cityForm!: FormGroup;
    constructor(private formBuilder: FormBuilder) {
      this.cityForm = this.formBuilder.group({
        id: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
        code: [''],
        description: [''],
        status: [true],
      });
    }

    addCity() {
      if (this.cityForm.invalid) {
        console.log(this.message = "error creating city");
      } else {
        console.log(this.cityForm.value);
        const city: City = { ...this.cityForm.value }
        this.add.emit(city);
         // Limpia el formulario y restablece los valores iniciales
      this.cityForm.reset({
        id: [0],
        code: [''],
        description: [''],

      });
      };
    }


}
