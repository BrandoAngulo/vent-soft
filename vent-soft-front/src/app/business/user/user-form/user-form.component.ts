import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UserDTO } from '../user.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RolesDTO } from './roles.dto';
import { UserService } from '../services/user.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
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
  roles: RolesDTO[] = [];
  filterRol: RolesDTO[] = [];
  loadRoles = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      lastName: [''],
      login: [''],
      roles: [''],
      password: [''],
      code: [''],
      email: ['', [Validators.required, Validators.email]],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.getRoles();
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
        password: this.userEdit?.password,
        code: this.userEdit?.code,
        email: this.userEdit?.email,
      });
    } else {
      this.userForm.reset({
        name: '',
        lastName: '',
        login: '',
        password: '',
        code: '',
        email: '',
        status: true,
      });
    }
    this.filterRol = [...this.roles];
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
      password: '',
      code: '',
      email: '',
    });
    this.filterRol = [...this.roles];
  }

  getRoles() {
    this.loadRoles = true;

    this.userService.listRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.filterRol = [...this.roles];
        this.loadRoles = false;
        this.loadUserData();
      },
      error: (err) => {
        console.error('Error loading roles: ', err)
        this.loadRoles = false;
      },
    });

  }

    compareRoles(rol: RolesDTO, rol1: RolesDTO): boolean {
      return rol && rol1 ? rol.id === rol1.id : rol === rol1;
    }

  filterRoles(evento: Event): void {
    const filterValue = (evento.target as HTMLInputElement).value.toLowerCase();
    this.filterRol = this.roles.filter(rol =>
      rol.description.toLowerCase().includes(filterValue) ||
      rol.id.toString().includes(filterValue)
    );
  }
}

