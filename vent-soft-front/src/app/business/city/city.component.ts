import { timer } from 'rxjs';
import { CityDTO } from './city.dto';
import { Component, OnInit } from '@angular/core';
import { CityFormComponent } from './city-form/city-form.component';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [
    UiTableComponent,
    CityFormComponent,
  ],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export default class CityComponent implements OnInit {

  city: CityDTO[] = [];
  tableColumns: TableColumn<CityDTO>[] = [];
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
          description: 'Tabogo',
          status: true,
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
      { 
        label: 'Acciones', 
        def: 'acciones', 
        content: () => '' 
      },

    ]

  }

  addCity(city: CityDTO) {
    console.log(city);
    this.city = [...this.city, city];
  }

    editCity(cityDTO: CityDTO): void {
      console.log('Editar factura', cityDTO);
      // Lógica para editar la factura
    }

    deleteCity(cityDTO: CityDTO): void {
      console.log('eliminar factura', cityDTO);
      // Lógica para editar la factura
    }

}
