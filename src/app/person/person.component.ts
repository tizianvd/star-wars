import { Component, OnInit } from '@angular/core';
import { Person, Planet } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: Person;
  homeworld?: Planet;

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

  getPerson() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getPerson(id)
    .subscribe(
      person => {
        this.person = person
        this.getHomeworld();
      }
    );
  }

  getHomeworld() : void {
    this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.person?.homeworld))
    .subscribe(planet => this.homeworld = planet)
  }


  ngOnInit(): void {
    this.getPerson();
  }

}
