import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { City } from './city.model';
import { timer } from 'rxjs';
import { CityFormComponent } from './city-form/city-form.component';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [UiTableComponent, CityFormComponent, MatProgressSpinnerModule, CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export default class CityComponent implements OnInit {

  city: City[] = [];
  tableColumns: TableColumn<City>[] = [];
  isLoadingCity = true;

  ngOnInit(): void {
    this.getCity()
    this.setTableColumns();
  }

  getCity() {
    timer(2000).subscribe(() => {
      this.isLoadingCity = false;
      this.city = [
        {
          id: 1,
          code: '#255',
          status: true,
          description: 'Tabogo',
        },
        {
          id: 2,
          code: '#255',
          description: 'Cali',
          status: true,
        },
        {
          id: 3,
          code: '#255',
          description: 'Medellin',
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
        label: 'Code',
        def: 'code',
        content: (row) => row.code,
      },

      {
        label: 'Description',
        def: 'description',
        content: (row) => row.description,
      },

      {
        label: 'Status',
        def: 'status',
        content: (row) => row.status,
      },

    ]

  }

  addCity(city: City) {
    console.log(city);
    this.city = [...this.city, city];
  }

}
