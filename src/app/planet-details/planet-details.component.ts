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
  loaded: boolean = false;
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
      this.getResidents()
      this.getFilms()
  });
  }

  getResidents(): void {
    this.dataService.getAllRecords("people").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.dataService.getIDFromURL("planets", element.homeworld) == this.planet.id){
          this.residents.push(element);
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
        if (this.planet.films.includes(element.url)){
          this.films.push(element);
          this.films.sort((a: Film, b: Film) => a.id - b.id)

        }
      });
      }
      });
  }

  handlePageEvent(newPage: any) {
    this.getResidents()
  }

  ngOnInit(): void {
    this.getPlanet();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];

}
