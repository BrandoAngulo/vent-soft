import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserDTO } from '../user.dto';
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
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit, OnChanges {

  @Output() add = new EventEmitter<UserDTO>();
  @Input() userEdit: UserDTO | null = null;
  @Output() update = new EventEmitter<UserDTO>;

  message = "";
  userForm!: FormGroup;
  submit = false;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      login: [''],
      code: [''],
      email: ['', [Validators.required, Validators.email]],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userEdit']) {
      this.loadUserData();
    }
  }

  loadUserData() {
    if (this.userEdit) {
      this.userForm.patchValue({
        name: this.userEdit?.name,
        lastName: this.userEdit?.lastName,
        login: this.userEdit?.login,
        code: this.userEdit?.code,
        email: this.userEdit?.email,
      });
    } else {
      this.userForm.reset({
        name: '',
        lastName: '',
        login: '',
        code: '',
        email: '',
        status: true,
      });
    }
  }

  addUser() {
    if (this.userForm.invalid) {
      console.error(this.message = "Creating user error");
      return;
    }
    this.submit = true;
    const formValue = this.userForm.value;
    const user: UserDTO = {
      ...formValue,
      id: this.userEdit?.id,
      status: true
    }
    if (this.userEdit) {
      console.log("Actualizar");
      this.update.emit(user);
    } else {
      console.log("Agregar");
      this.add.emit(user);
    }
    this.submit = false;
    this.userForm.reset({
      name: '',
      lastName: '',
      login: '',
      code: '',
      email: '',
    });
  }
}

