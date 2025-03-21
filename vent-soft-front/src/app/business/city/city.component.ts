import { CityDTO } from './city.dto';
import { Component, OnInit } from '@angular/core';
import { CityFormComponent } from './city-form/city-form.component';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { CityService } from './services/city.service';

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

  constructor(private cityService: CityService){}

  ngOnInit(): void {
    this.getCities()
    this.setTableColumns();
  }

  getCities(){
    this.isLoadingCity = true;
    this.cityService.list().subscribe({
      next: (city) =>{
        this.city = city;
        this.isLoadingCity = false;
        console.log(this.city = city)
      },
      error: (err) => {
        console.error('Error loading cities:', err);
        this.isLoadingCity = false;
      }
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
        def: 'name',
        content: (row) => row.name,
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
