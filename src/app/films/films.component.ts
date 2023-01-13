import { Component, OnInit } from '@angular/core';
import { Film } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: any[] = [];
  loaded: boolean = false;
  columns = {
    'id' : {name: 'ID'},
    'title' : {name: 'Title'},
    'url' : {name: 'Details', url: ['/film-details/','id']},
  }

  constructor(private dataService: StarWarsDataService){}

  getFilms(): void {
    this.dataService.getPage("films", 1).subscribe({
      next: data => {this.films = data
      this.films.sort((a: Film, b: Film) => a.id - b.id)
      },
      complete: () => {this.loaded = true}
    });
  }

  ngOnInit(): void {
    this.getFilms();
  }
}
