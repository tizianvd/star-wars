import { Component, OnInit, ViewChild } from '@angular/core';
import { Species, Planet, Person } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {
  species!: Species;
  homeworld?: Planet;
  people: Person[] = [];
  loaded: boolean = false;
  @ViewChild(MatTable) table?: MatTable<any>;
  displayedColumns: string[] = ['id', 'name', 'url'];

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
          this.getPeople();
        }
      );
    }

    getHomeworld() : void {
      this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.species?.homeworld))
      .subscribe({
        next: planet => {this.homeworld = planet},
      })
    }

    renderRows() {
      this.table?.renderRows();
    }

    getPeople(): void {
      this.dataService.getAllRecords("people").subscribe({
        next: data => {
        data.forEach(element => {
          if (this.species.people.includes(element.url)){
            this.renderRows();
            this.people.push(element);
            this.people.sort((a: Person, b: Person) => a.id - b.id)
  
          }
        });
        
      }, 
      complete: () => {
        this.loaded = true;
        }
      });
    }

    ngOnInit(): void {
      this.getSpecies();
    }
}
