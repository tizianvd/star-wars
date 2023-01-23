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
        this.getData<Species>(this.person.species, this.species, "species");
        this.getData<Starship>(this.person.starships, this.starships, "starships");
        this.getData<Vehicle>(this.person.vehicles, this.vehicles, "vehicles");
        this.getData<Film>(this.person.films, this.films, "films");

      }
    );
  }

  getHomeworld() : void {
    this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.person?.homeworld))
    .subscribe(planet => this.homeworld = planet)
  }

  getData<T extends Species | Starship | Vehicle | Film>(list: T[], resultList: T[], field: string): void {
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
    this.getPerson();
  }

}
