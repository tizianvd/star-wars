import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, Person, Planet, Species, Starship, Vehicle } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film!: Film;
  characters: Person[] = [];
  planets: Planet[] = [];
  species: Species[] = [];
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];
  loadedComponents: number = 0;
  characterPagination = {length: 0, paginatorEnabled: true, pageSize: 10};
  charactersTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/person/', 'id']}
  };
  planetPagination = {length: 0, paginatorEnabled: true, pageSize: 10};
  planetTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/planet-details/', 'id']}
  };
  speciesPagination = {length: 0, paginatorEnabled: true, pageSize: 10};
  speciesTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/species-details/', 'id']}
  };
  starshipPagination = {length: 0, paginatorEnabled: true, pageSize: 10};
  starshipTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/starship-details/', 'id']}
  };
  vehiclePagination = {length: 0, paginatorEnabled: true, pageSize: 10};
  vehicleTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/vehicle-details/', 'id']}
  };
  constructor(
    private route: ActivatedRoute,
    private dataService: StarWarsDataService

  ){}

  getFilm() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("films", id)
    .subscribe(
      film => {
        this.film = film
        this.getData<Person>(this.film.characters, this.characters, "people");
        this.getData<Planet>(this.film.planets, this.planets, "planets");
        this.getData<Species>(this.film.species, this.species, "species");
        this.getData<Starship>(this.film.starships, this.starships, "starships");
        this.getData<Vehicle>(this.film.vehicles, this.vehicles, "vehicles");

      }
    );
  }


  getData<T extends Person | Planet | Species | Starship | Vehicle>(list: T[], resultList: T[], field: string): void {
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
    this.getFilm();
  }
}
