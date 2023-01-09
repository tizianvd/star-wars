import { Component, OnInit } from '@angular/core';
import { Species, Planet } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {
  species!: Species;
  homeworld?: Planet;
  loaded: boolean = false;

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

    getSpecies() : void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.dataService.getRecord("species", id)
      .subscribe(
        species => {
          this.species = species
          this.getHomeworld();
        }
      );
    }

    getHomeworld() : void {
      this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.species?.homeworld))
      .subscribe({
        next: planet => {this.homeworld = planet},
        complete: () => {this.loaded = true},
      })
    }

    ngOnInit(): void {
      this.getSpecies();
    }
}
