import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, Person, Starship } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css']
})
export class StarshipDetailsComponent {
  starship!: Starship;
  pilots: Person[] = [];
  films: Film[] = [];
  loaded: boolean = false;
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

    
  getStarship() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("starships", id)
    .subscribe(
      starship => {
        this.starship = starship
        this.getPilots();
        this.getFilms();
      }
    );
  }

  getPilots(): void {
    this.dataService.getAllRecords("people").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.starship.pilots.includes(element.url)){
          this.pilots.push(element);
          this.pilots.sort((a: Person, b: Person) => a.id - b.id)

        }
      });
      
      }, 
      complete: () => {
        this.loaded = true;
        }
      });
  }

  getFilms(): void {
    this.dataService.getAllRecords("films").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.starship.films.includes(element.url)){
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
    this.getStarship();
  }
}
