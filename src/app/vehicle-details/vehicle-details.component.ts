import { Component, OnInit } from '@angular/core';
import { Vehicle, Film, Person } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: Vehicle;
  loadedComponents: number = 0;
  pilots: Person[] = [];
  films: Film[] = [];
  pilotsTableColumns = {'id' : {name: 'ID'}, 
  'name' : {name: 'Name'}, 
  'url' : {name: 'Details', url:['/person/', 'id']}
  };
  filmsTableColumns = {'id' : {name: 'ID'}, 
  'title' : {name: 'Title'}, 
  'url' : {name: 'Details', url:['/film-details/', 'id']}
  };

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

  getVehicle() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("vehicles", id)
    .subscribe(
      vehicle => {
        this.vehicle = vehicle
        this.getData<Person>(this.vehicle.pilots, this.pilots, "people");
        this.getData<Film>(this.vehicle.films, this.films , "films");
      }
    );
  }

  getData<T extends Person | Film>(list: T[], resultList: T[], field: string): void {
    this.dataService.getAllRecords(field).subscribe({
      next: data => {
      data.forEach(element => {
        if (list.includes(element.url)){
          resultList.push(element);
          resultList.sort((a: T, b: T) => a.id - b.id)

        }
      });
      
      }, 
      complete: () => {
        this.loadedComponents++;
        }
      });
  }

  ngOnInit(): void {
    this.getVehicle();
  }
}
