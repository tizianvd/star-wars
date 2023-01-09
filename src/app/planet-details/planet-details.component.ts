import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet, Person } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';

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
    for (let i = 1; i < 8; i++)
    {
      this.dataService.getPeople(i).subscribe(data => {
        data.forEach(element => {
          if (this.dataService.getIDFromURL("planets", element.homeworld) == this.planet.id){
            this.renderRows();
            this.residents.push(element);
          }
        });
        
     });
    }
  }

  ngOnInit(): void {
    this.getPlanet();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];

}
