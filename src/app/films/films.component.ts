import { Component, OnInit, ViewChild } from '@angular/core';
import { Film } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'url'];
 
  @ViewChild(MatTable) table?: MatTable<any>;

  constructor(private dataService: StarWarsDataService){}

  renderRows(){
    this.table?.renderRows();
  }

  getFilms(): void {
    this.dataService.getPage("films", 1).subscribe(
      data => {this.films = data
      this.films.sort((a: Film, b: Film) => a.id - b.id)

      this.renderRows();
    });
  }

  ngOnInit(): void {
    this.getFilms();
  }
}
