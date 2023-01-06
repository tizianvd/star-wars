import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

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

  getPlanet() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getPlanet(id)
    .subscribe(planet => this.planet = planet);
  }

  ngOnInit(): void {
    this.getPlanet();
  }

}
