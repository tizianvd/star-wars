import { Component, ViewChild } from '@angular/core';
import { StarWarsDataService } from '../star-wars-data.service';
import { Person } from '../interfaces';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  people: any = [];
  loaded: boolean = false;
  pagination = {length: 0, paginatorEnabled: true};
  columns = {
    'id' : {name: 'ID'},
    'name' : {name: 'Name'},
    'url' : {name: 'Details', url: ['/person/','id']},
  }


  constructor(
    private dataService: StarWarsDataService
            ) {}

  getPeople(page: number): void {
    this.dataService.getPage("people", page).subscribe(data => {
      this.people = data;
      this.people.sort((a: Person, b: Person) => a.id - b.id)
      this.loaded = true;
    });
  }

  getTotalPeopleCount() {
    this.dataService.getRecordCount("people").subscribe(count => this.pagination.length = count);
  }

  handlePageEvent(event: any) {
    this.getPeople(event);
  }


  ngOnInit() {
    this.getPeople(1);
    this.getTotalPeopleCount();
  }
  
}
