import { Component, OnInit } from '@angular/core';
import { Vehicle, Film } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: Vehicle;
  loaded: boolean = false;
  films: Film[] = [];
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
        this.getFilms();
      }
    );
  }

  getFilms(): void {
    this.dataService.getAllRecords("films").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.vehicle.films.includes(element.url)){
          this.films.push(element);
          this.films.sort((a: Film, b: Film) => a.id - b.id)

        }
      });
      
      }, 
      complete: () => {
        this.loaded = true;
        }
      });
  }

  ngOnInit(): void {
    this.getVehicle();
  }
}
