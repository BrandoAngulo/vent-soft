import { Component, EventEmitter, Output } from '@angular/core';
import { User } from './user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  @Output() add = new EventEmitter<User>();
  message = "";
  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      name: [''],
      lastName: [''],
      code: [''],
      email: ['', [Validators.required, Validators.email]],
      status: [false, Validators.requiredTrue],
    });
  }

  addUser() {
    if (this.userForm.invalid) {
      console.log(this.message = "Creating user error");
    } else {
      console.log(this.userForm.value);
      const user: User = { ...this.userForm.value }
      this.add.emit(user);
      // Limpia el formulario y restablece los valores iniciales
      this.userForm.reset({
        id: [0],
        name: [''],
        lastName: [''],
        code: [''],
        email: [''],
        status: [false],
      });
    };
  }

}

