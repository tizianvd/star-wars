import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, Person } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film!: Film;
  characters: Person[] = [];
  loaded: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'url'];
  constructor(
    private route: ActivatedRoute,
    private dataService: StarWarsDataService

  ){}

  @ViewChild(MatTable) table?: MatTable<any>;

  getFilm() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getFilm(id)
    .subscribe(
      film => {
        this.film = film
        this.getCharacters();
      }
    );
  }

  renderRows() {
    this.table?.renderRows();
  }

  getCharacters(): void {
    for (let i = 1; i < 8; i++)
    {
      this.dataService.getPeople(i).subscribe(data => {
        data.forEach(element => {
          if (this.film.characters.includes(element.url)){
            this.renderRows();
            this.characters.push(element);
            this.characters.sort((a: Person, b: Person) => a.id - b.id)
            this.loaded = true;
          }
        });
        
     });
    }
  }

  ngOnInit(): void {
    this.getFilm();
  }
}
