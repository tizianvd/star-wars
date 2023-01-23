import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet, Person, Film } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})
export class PlanetDetailsComponent implements OnInit {

  constructor(
          private dataService: StarWarsDataService,
          private route: ActivatedRoute,
  ) {}

  planet!: Planet;
  residents: Person[] = [];
  films: Film[] = [];
  loadedComponents: number = 0;
  residentsTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/person/', 'id']}
  };
  filmsTableColumns = {'id' : {name: 'ID'}, 
                       'title' : {name: 'Title'}, 
                       'url' : {name: 'Details', url:['/film-details/', 'id']}
  };

  getPlanet() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("planets", id)
    .subscribe(
      planet => {this.planet = planet
      this.getData<Person>(this.planet.residents, this.residents, "people");
      this.getData<Film>(this.planet.films, this.films, "films");

  });
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
    this.getPlanet();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];

}
