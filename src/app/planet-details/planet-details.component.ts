import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet, Person } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

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
  loaded: boolean = false;
  currentPage: number = 0;
  paginatorEnabled: boolean = false;
  @ViewChild(MatTable) table?: MatTable<any>;

  getPlanet() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("planets", id)
    .subscribe(
      planet => {this.planet = planet
      this.getResidents()
  });
  }

  renderRows() {
    this.table?.renderRows();
  }

  getResidents(): void {
    this.dataService.getAllRecords("people").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.dataService.getIDFromURL("planets", element.homeworld) == this.planet.id){
          this.renderRows();
          this.residents.push(element);
        }
      });
      
      },
     
      complete: () => {
        this.loaded = true;
        }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
  }

  ngOnInit(): void {
    this.getPlanet();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];

}
