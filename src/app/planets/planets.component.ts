import { Component, OnInit, ViewChild } from '@angular/core';
import { StarWarsDataService } from '../star-wars-data.service';
import { Planet } from '../interfaces';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  planets: any = [];
  loaded: boolean = false;
  totalPlanetCount: number = 0;
  paginatorEnabled: boolean = true;
  @ViewChild(MatTable) table?: MatTable<any>;

  constructor(
    private dataService: StarWarsDataService
            ) {}

  renderRows(){
    this.table?.renderRows();
  }

  getPlanets(page: number): void {
    this.dataService.getPage("planets", page).subscribe(
      data => {this.planets = data
      this.planets.sort((a: Planet, b: Planet) => a.id - b.id)
      this.renderRows();
      this.loaded = true;
      this.paginatorEnabled = true;
    });
  }

  getTotalPlanetCount() {
    this.dataService.getRecordCount("planets").subscribe(count => this.totalPlanetCount = count);
  }

  handlePageEvent(event: PageEvent) {
    this.paginatorEnabled = false;
    this.getPlanets(event.pageIndex + 1);
  }

  ngOnInit() {
    this.getPlanets(1);
    this.getTotalPlanetCount();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];
}
