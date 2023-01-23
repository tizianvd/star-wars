import { Component, OnInit } from '@angular/core';
import { Person, Planet, Film, Species, Starship, Vehicle } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: Person;
  films: Film[] = [];
  species: Species[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];
  homeworld?: Planet;
  loadedComponents: number = 0;
  speciesTableColumns = {'id' : {name: 'ID'}, 
                       'name' : {name: 'Name'}, 
                       'url' : {name: 'Details', url:['/species-details/', 'id']}
  };
  starshipsTableColumns = {'id' : {name: 'ID'}, 
  'name' : {name: 'Name'}, 
  'url' : {name: 'Details', url:['/starship-details/', 'id']}
  };
  vehiclesTableColumns = {'id' : {name: 'ID'}, 
  'name' : {name: 'Name'}, 
  'url' : {name: 'Details', url:['/vehicle-details/', 'id']}
  };
  filmsTableColumns = {'id' : {name: 'ID'}, 
                       'title' : {name: 'Title'}, 
                       'url' : {name: 'Details', url:['/film-details/', 'id']}
  };

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

  getPerson() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("people", id)
    .subscribe(
      person => {
        this.person = person
        this.getHomeworld();
        this.getFilms();
        this.getSpecies();
        this.getStarships();
        this.getVehicles();
      }
    );
  }

  getHomeworld() : void {
    this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.person?.homeworld))
    .subscribe(planet => this.homeworld = planet)
  }

  getFilms(): void {
    this.dataService.getAllRecords("films").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.person.films.includes(element.url)){
          this.films.push(element);
          this.films.sort((a: Film, b: Film) => a.id - b.id)

        }
      });
      }
      });
  }

  getSpecies(): void {
    this.dataService.getAllRecords("species").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.person.species.includes(element.url)){
          this.species.push(element);
          this.species.sort((a: Species, b: Species) => a.id - b.id)

        }
      });
      
      }, 
      complete: () => {
        this.loadedComponents++;
        }
      });
  }

  getStarships(): void {
    this.dataService.getAllRecords("starships").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.person.starships.includes(element.url)){
          this.starships.push(element);
          this.starships.sort((a: Starship, b: Starship) => a.id - b.id)

        }
      });
      
      }, 
      complete: () => {
        this.loadedComponents++;
        }
      });
  }

  getVehicles(): void {
    this.dataService.getAllRecords("vehicles").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.person.vehicles.includes(element.url)){
          this.vehicles.push(element);
          this.vehicles.sort((a: Vehicle, b: Vehicle) => a.id - b.id)

        }
      });
      
      }, 
      complete: () => {
        this.loadedComponents++;
        }
      });
  }


  ngOnInit(): void {
    this.getPerson();
  }

}
