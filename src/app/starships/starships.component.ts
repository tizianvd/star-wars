import { Component, OnInit } from '@angular/core';
import { Starship } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {
  loaded: boolean = false;
  starships: Starship[] = [];
  pagination = {length: 0, paginatorEnabled: true};
  columns = {
    'id' : {name: 'ID'},
    'name' : {name: 'Name'},
    'url' : {name: 'Details', url: ['/starship-details/','id']},
  }

  constructor(private dataService: StarWarsDataService){}

  getStarships(page: number): void {
    this.dataService.getPage("starships", page).subscribe(data => {
      this.starships = data;
      this.starships.sort((a: Starship, b: Starship) => a.id - b.id)
      this.getStarshipCount();
    });
  }

  getStarshipCount() {
    this.dataService.getRecordCount("starships").subscribe({
      next: (count: number) => {this.pagination.length = count},
      complete: () => (this.loaded = true),
    });
  }

  
  handlePageEvent(newPage: any) {
    this.getStarships(newPage);
  }

  ngOnInit(): void {
    this.getStarships(1);
  }
}
