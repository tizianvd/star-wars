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
  loadedComponents: number = 0;
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
        this.getData<Person>(this.starship.pilots, this.pilots, "people");
        this.getData<Film>(this.starship.films, this.films , "films");
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
    this.getStarship();
  }
}
