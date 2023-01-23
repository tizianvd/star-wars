import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, Person, Planet, Species, Starship } from '../interfaces';
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
        this.getCharacters();
        this.getPlanets();
        this.getSpecies();
        this.getStarships();
      }
    );
  }

  getCharacters(): void {
    this.dataService.getAllRecords("people").subscribe(data => {
      data.forEach(element => {
        if (this.film.characters.includes(element.url)){
          this.characters.push(element);
          this.characters.sort((a: Person, b: Person) => a.id - b.id)
          this.characterPagination.length = this.characters.length;

        }
      });
      
    }, null, 
    () => {
      this.loadedComponents++;
      }
    );
  }

  getPlanets(): void {
    this.dataService.getAllRecords("planets").subscribe(data => {
      data.forEach(element => {
        if (this.film.planets.includes(element.url)){
          this.planets.push(element);
          this.planets.sort((a: Planet, b: Planet) => a.id - b.id)
          this.planetPagination.length = this.planets.length;

        }
      });
      
    }, null, 
    () => {
      this.loadedComponents++;
      }
    );
  }

  getSpecies(): void {
    this.dataService.getAllRecords("species").subscribe(data => {
      data.forEach(element => {
        if (this.film.species.includes(element.url)){
          this.species.push(element);
          this.species.sort((a: Species, b: Species) => a.id - b.id)
          this.speciesPagination.length = this.species.length;

        }
      });
      
    }, null, 
    () => {
      this.loadedComponents++;
      }
    );
  }

  getStarships(): void {
    this.dataService.getAllRecords("starships").subscribe(data => {
      data.forEach(element => {
        if (this.film.starships.includes(element.url)){
          this.starships.push(element);
          this.starships.sort((a: Starship, b: Starship) => a.id - b.id)
          this.starshipPagination.length = this.starships.length;

        }
      });
      
    }, null, 
    () => {
      this.loadedComponents++;
      }
    );
  }

  ngOnInit(): void {
    this.getFilm();
  }
}
