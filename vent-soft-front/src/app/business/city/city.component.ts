import { CityDTO } from './city.dto';
import { Component, OnInit } from '@angular/core';
import { CityFormComponent } from './city-form/city-form.component';
import { TableColumn, UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { CityService } from './services/city.service';
import { ApiResponse } from '../../../apiResponse.dto';

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
  selectedCity: CityDTO | null = null;

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.getCities();
    this.setTableColumns();
  }

  getCities() {
    this.isLoadingCity = true;
    this.cityService.list().subscribe({
      next: (city) => {
        this.city = city;
        this.isLoadingCity = false;
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
        label: 'Codigo',
        def: 'code',
        content: (row) => row.code,
      },

      {
        label: 'Ciudad',
        def: 'name',
        content: (row) => row.name,
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
    this.cityService.create(city).subscribe({
      next: (newCity) => {
        this.getCities();
        this.selectedCity = null
        console.log('ciudad creada exitosamente: ', newCity);
      },
      error: (err) => {
        console.log('Error al crear la ciudad', err);
      }
    });
  }

  editCity(cityDTO: CityDTO): void {
    this.selectedCity = {...cityDTO};
  }

  deleteCity(cityDTO: CityDTO): void {
    if (!cityDTO.id) {
      console.error('City not found');
      return;
    }
    this.cityService.delete(cityDTO.id).subscribe({
      next: (response: ApiResponse<string>) => {
        this.city = this.city.filter(city => city.id !== cityDTO.id);
        console.log(`Status= ${response.status} Payload= ${response.payload?.messsage}`);
      },
      error: (err) => {
        console.log('city deleted error: ', err);
      }
    });
  }

  updateCity(cityDTO: CityDTO): void {
    if (!cityDTO.id) {
      console.log('ID not found');
      return;
    }
    this.cityService.update(cityDTO.id, cityDTO).subscribe({
      next: (updatedCity) =>{
        this.getCities();
        this.selectedCity = null;
        console.log('city actualizada:', updatedCity);
      },
      error: (err) =>{
        console.error('Error al actualizar la ciudad: ', err);
      }
    });
  }

}
