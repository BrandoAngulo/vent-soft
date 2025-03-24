import { Component, OnInit } from '@angular/core';
import { UserDTO } from './user.dto';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { UserFormComponent } from "./user-form/user-form.component";
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { ApiResponse } from '../../../apiResponse.dto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    UiTableComponent,
    UserFormComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit {
  users: UserDTO[] = [];
  tableColumns: TableColumn<UserDTO>[] = [];
  loadUser = true;
  selectedUser: UserDTO | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers()
    this.setTableColumns()
  }

  getUsers() {
    this.loadUser = true;
    this.userService.list().subscribe({
      next: (users) => {
        this.users = users;
        this.loadUser = false;
      },
      error: (err) => {
        console.error('Error loading users: ', err)
        this.loadUser = false;
      },
    });
  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },
      {
        label: 'Nombre',
        def: 'name',
        content: (row) => row.name,
      },
      {
        label: 'Apellido',
        def: 'lastName',
        content: (row) => row.lastName,
      },
      {
        label: 'Login',
        def: 'login',
        content: (row) => row.login,
      },
      {
        label: 'Codigo',
        def: 'code',
        content: (row) => row.code,
      },
      {
        label: 'Correo',
        def: 'email',
        content: (row) => row.email,
      },
      {
        label: 'Estado',
        def: 'status',
        content: (row) => row.status,
      },
      {
        label: 'Acciones',
        def: 'acciones',
        content: () => ''
      }
    ]
  }

  addUser(user: UserDTO) {
    this.userService.create(user).subscribe({
      next: (newUser) => {
        this.getUsers();
        this.selectedUser = null
        console.log("Usuario creado exitosamente", newUser);
      },
      error: (err) => {
        console.error("error al crear la usuario: ", err);
      },
    })
  }

  editUser(userDTO: UserDTO): void {
    this.selectedUser = { ...userDTO };
  }

  deleteUser(userDTO: UserDTO): void {
    if (!userDTO.id) {
      console.error('User not found');
      return;
    }
    this.userService.delete(userDTO.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.users = this.users.filter(user => user.id !== userDTO.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`)
      },
      error: (err) => {
        console.error('User deleted error: ', err);
      },
    });
  }

  updateUser(userDTO: UserDTO): void {
    if (!userDTO) {
      console.error("User not found")
      return;
    }
    this.userService.update(userDTO.id, userDTO).subscribe({
      next: (updateUser) => {
        this.getUsers();
        this.selectedUser = null;
        console.log("User updated successfull: ", updateUser)
      },
      error: (err) => {
        console.error('Error al actualizar el usuario: ', err);
      },
    })
  }

  updateUserStatus(userDTO: UserDTO): void {
    if (!userDTO.id) {
      console.error('ID not found');
      return;
    }

    this.userService.update(userDTO.id, userDTO).subscribe({
      next: (updatedUser) => {
        this.getUsers(); // Refrescar la lista
        this.selectedUser = null; // Limpiar selección
        console.log('Usuario actualizado exitosamente:', updatedUser);
      },
      error: (err) => {
        console.error('Error al actualizar estado:', err);
        // Si hay error, podrías revertir el cambio en la UI
        const index = this.users.findIndex(user => user.id === userDTO.id);
        if (index !== -1) {
          this.users[index].status = !userDTO.status; // Revertir el cambio
          this.users = [...this.users]; // Forzar actualización
        }
      }
    });
  }
}
