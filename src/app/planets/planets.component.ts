import { Component, OnInit, ViewChild } from '@angular/core';
import { StarWarsDataService } from '../star-wars-data.service';
import { Planet } from '../interfaces';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  planets: any = [];
  loaded: boolean = false;
  pagination = {length: 0, paginatorEnabled: true};

  constructor(
    private dataService: StarWarsDataService
            ) {}

  getPlanets(page: number): void {
    this.dataService.getPage("planets", page).subscribe(
      data => {this.planets = data
      this.planets.sort((a: Planet, b: Planet) => a.id - b.id)
      this.loaded = true;
    });
  }

  getTotalPlanetCount() {
    this.dataService.getRecordCount("planets").subscribe(count => this.pagination.length = count);
  }

  handlePageEvent(event: any) {
    this.getPlanets(event);
  }

  ngOnInit() {
    this.getPlanets(1);
    this.getTotalPlanetCount();
  }

  columns = {
              'id' : {name: 'ID'},
              'name' : {name: 'Name'},
              'url' : {name: 'Details', url: ['/planet-details/','id']},
}
}
