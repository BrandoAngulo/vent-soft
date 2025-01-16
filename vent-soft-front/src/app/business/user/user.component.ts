import { Component } from '@angular/core';
import { User } from './user.model';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { timer } from 'rxjs';
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UiTableComponent,
    UserFormComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent {
  users: User[] = [];
  tableColumns: TableColumn<User>[] = [];
  isLoadingProduct = true;

  ngOnInit(): void {
    this.getUsers()
    this.setTableColumns()
  }

  getUsers() {
    timer(2000).subscribe(() => {
      this.isLoadingProduct = false
      this.users = [
        {
          id: 1,
          name: 'Armano',
          lastName: 'Casas',
          code: 'C5050',
          email: 'armando@gmail.com',
          status: true,
        },
        {
          id: 2,
          name: 'Armano',
          lastName: 'Casas',
          code: 'C5050',
          email: 'armando@gmail.com',
          status: true,
        },
        {
          id: 3,
          name: 'Armano',
          lastName: 'Casas',
          code: 'C5050',
          email: 'armando@gmail.com',
          status: true,
        },
      ]

    })

  }

  setTableColumns() {
    this.tableColumns = [
      {
        label: 'Id',
        def: 'id',
        content: (row) => row.id,
      },
      {
        label: 'Name',
        def: 'name',
        content: (row) => row.name,
      },
      {
        label: 'Description',
        def: 'lastName',
        content: (row) => row.lastName,
      },
      {
        label: 'Code',
        def: 'code',
        content: (row) => row.code,
      },
      {
        label: 'Email',
        def: 'email',
        content: (row) => row.email,
      },
      {
        label: 'Status',
        def: 'status',
        content: (row) => row.status,
      },

    ]
  }

  addUser(user: User) {
    console.log(user);
    this.users = [...this.users, user];
  }


}
