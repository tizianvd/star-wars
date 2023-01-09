import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, Person } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film!: Film;
  characters: Person[] = [];
  currentPage: number = 0;
  loaded: boolean = false;
  paginatorEnabled: boolean = false;
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
    this.dataService.getAllPeople().subscribe(data => {
      data.forEach(element => {
        if (this.film.characters.includes(element.url)){
          this.renderRows();
          this.characters.push(element);
          this.characters.sort((a: Person, b: Person) => a.id - b.id)

        }
      });
      
    }, null, 
    () => {
      this.loaded = true;
      this.paginatorEnabled = true;
      }
    );
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
  }

  ngOnInit(): void {
    this.getFilm();
  }
}
