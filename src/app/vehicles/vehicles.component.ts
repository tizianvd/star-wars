import { Component } from '@angular/core';
import { Vehicle } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  loaded: boolean = false;
  vehicles: Vehicle[] = [];
  pagination = {length: 0, paginatorEnabled: true};
  columns = {
    'id' : {name: 'ID'},
    'name' : {name: 'Name'},
    'url' : {name: 'Details', url: ['/vehicle-details/','id']},
  }


  constructor(private dataService: StarWarsDataService){}

  getVehicles(page: number): void {
    this.dataService.getPage("vehicles", page).subscribe(data => {
      this.vehicles = data;
      this.vehicles.sort((a: Vehicle, b: Vehicle) => a.id - b.id)
      this.getVehicleCount();
    });
  }

  getVehicleCount() {
    this.dataService.getRecordCount("vehicles").subscribe({
      next: (count: number) => {this.pagination.length = count},
      complete: () => (this.loaded = true),
    });
  }

  handlePageEvent(newPage: any) {
    this.getVehicles(newPage);
  }

  ngOnInit(): void {
    this.getVehicles(1);
  }
}
