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
import { AlertService } from '../../../shared/services/alert.service';
import { FormUtilsService } from '../../../shared/utils/form-utils.service';

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
    private formUtilsService: FormUtilsService,
    private alertService: AlertService,
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      login: ['', Validators.required],
      roles: ['', Validators.required],
      password: [''],
      code: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.formUtilsService.AutoFirstWordMayus(this.userForm);
  }

  ngOnInit(): void {
    this.loadUserData();
    this.getRoles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userEdit'] && this.roles.length > 0) {
      this.loadUserData();
    }

  }

  loadUserData() {
    if (this.userEdit) {
      this.userForm.patchValue({
        name: this.userEdit?.name,
        lastName: this.userEdit?.lastName,
        login: this.userEdit?.login,
        password: '',
        roles: this.userEdit.roles,
        code: this.userEdit?.code,
        email: this.userEdit?.email,
      });
      this.passwordValidation(false);
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
      this.passwordValidation(true);
    }
    this.filterRol = [...this.roles];
  }

    /** Configura la validación del password */
    private passwordValidation(newUser: boolean) {
      const passwordControl = this.userForm.get('password');
      if (passwordControl) {
        if (newUser) {
          passwordControl.setValidators([Validators.required]); //  Requerido al crear
        } else {
          passwordControl.clearValidators(); // No requerido al editar
        }
        passwordControl.updateValueAndValidity(); // Actualizar validaciones
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
      roles: formValue.roles,
      password: formValue.password,
      status: true
    }
    console.log("Datos enviados: ", JSON.stringify(user));
    if (this.userEdit) {
      this.alertService.showSuccess();
      this.update.emit(user);
    } else {
      this.alertService.showSuccess();
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

