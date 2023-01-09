import { Component, OnInit, ViewChild } from '@angular/core';
import { Person, Planet, Film } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: Person;
  films: Film[] = [];
  homeworld?: Planet;
  loaded: boolean = false;
  @ViewChild(MatTable) table?: MatTable<any>;
  displayedColumns: string[] = ['id', 'title', 'url'];

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

  getPerson() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("people", id)
    .subscribe(
      person => {
        this.person = person
        this.getHomeworld();
        this.getFilms();
      }
    );
  }

  getHomeworld() : void {
    this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.person?.homeworld))
    .subscribe(planet => this.homeworld = planet)
  }

  renderRows() {
    this.table?.renderRows();
  }

  getFilms(): void {
    this.dataService.getAllRecords("films").subscribe({
      next: data => {
      data.forEach(element => {
        if (this.person.films.includes(element.url)){
          this.renderRows();
          this.films.push(element);
          this.films.sort((a: Film, b: Film) => a.id - b.id)

        }
      });
      
    }, 
    complete: () => {
      this.loaded = true;
      }
    });
  }


  ngOnInit(): void {
    this.getPerson();
  }

}
