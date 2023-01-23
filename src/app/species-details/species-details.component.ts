import { Component, OnInit } from '@angular/core';
import { Species, Planet, Person, Film } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {
  species!: Species;
  homeworld?: Planet;
  people: Person[] = [];
  films: Film[] = [];
  loadedComponents: number = 0;
  peopleTableColumns = {'id' : {name: 'ID'}, 
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

    getSpecies() : void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.dataService.getRecord("species", id)
      .subscribe(
        species => {
          this.species = species
          this.getHomeworld();
          this.getData<Person>(this.species.people, this.people, "people");
          this.getData<Film>(this.species.films, this.films, "films");

        }
      );
    }

    getHomeworld() : void {
      this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.species?.homeworld))
      .subscribe({
        next: planet => {this.homeworld = planet},
      })
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
      this.getSpecies();
    }
}
