import { CityDTO } from '../city.dto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class CityFormComponent implements OnInit, OnChanges {
  @Output() add = new EventEmitter<CityDTO>();
  @Input() cityEdit: CityDTO | null = null;
  @Output() update = new EventEmitter<CityDTO>;
  
  submit = false;
  message = "";
  cityForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.cityForm = this.formBuilder.group({
      name: [''],
      code: [''],
    });
  }

  ngOnInit(): void {
    this.loadCityData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cityEdit']) {
      this.loadCityData();
    }
  }

  loadCityData() {
    if (this.cityEdit) {
      this.cityForm.patchValue({
        name: this.cityEdit?.name,
        code: this.cityEdit?.code,
      });
    } else {
      this.cityForm.reset({
        name: '',
        code: '',
        status: true
      });
    }
  }

  addCity() {
    if (this.cityForm.invalid) {
      console.log(this.message = "error creating city");
      return;
    }
    this.submit = true
    const formValue = this.cityForm.value;
    const city: CityDTO = {
      ...formValue,
      id: this.cityEdit?.id,
      status: true
    }

    if (this.cityEdit) {
      console.log("Actualizar");
      this.update.emit(city);
    } else {
      console.log("Agregar");
      this.add.emit(city);
    }
    this.submit = false;
    this.cityForm.reset({
      name: '',
      code: ''
    });
  }
}
