import { Component, OnInit } from '@angular/core';
import { Person, Planet, Film, Species } from '../interfaces';
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
  homeworld?: Planet;
  loaded: boolean = false;
  speciesTableColumns = {'id' : {name: 'ID'}, 
                       'name' : {name: 'Name'}, 
                       'url' : {name: 'Details', url:['/species-details/', 'id']}
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
        this.loaded = true;
        }
      });
  }


  ngOnInit(): void {
    this.getPerson();
  }

}
