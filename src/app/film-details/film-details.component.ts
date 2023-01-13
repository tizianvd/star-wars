import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, Person } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film!: Film;
  characters: Person[] = [];
  loaded: boolean = false;
  pagination = {length: 0, paginatorEnabled: true, pageSize: 10};
  charactersTableColumns = {'id' : {name: 'ID'}, 
                      'name' : {name: 'Name'}, 
                      'url' : {name: 'Details', url:['/person/', 'id']}
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
      }
    );
  }

  getCharacters(): void {
    this.dataService.getAllRecords("people").subscribe(data => {
      data.forEach(element => {
        if (this.film.characters.includes(element.url)){
          this.characters.push(element);
          this.characters.sort((a: Person, b: Person) => a.id - b.id)
          this.pagination.length = this.characters.length;

        }
      });
      
    }, null, 
    () => {
      this.loaded = true;
      }
    );
  }

  ngOnInit(): void {
    this.getFilm();
  }
}
