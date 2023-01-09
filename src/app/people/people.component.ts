import { Component, ViewChild } from '@angular/core';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';
import { Person } from '../interfaces';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  people: any = [];
  loaded: boolean = false;
  totalPeopleCount: number = 0;
  paginatorEnabled: boolean = true;
  @ViewChild(MatTable) table?: MatTable<any>;


  constructor(
    private dataService: StarWarsDataService
            ) {}

  renderRows() {
    this.table?.renderRows();
  }

  getPeople(page: number): void {
    this.dataService.getPage("people", page).subscribe(data => {
      this.people = data;
      this.people.sort((a: Person, b: Person) => a.id - b.id)
      this.renderRows();
      this.loaded = true;
      this.paginatorEnabled = true;
      
    });
  }

  getTotalPeopleCount() {
    this.dataService.getRecordCount("people").subscribe(count => this.totalPeopleCount = count);
  }

  handlePageEvent(event: PageEvent) {
    this.paginatorEnabled = false;
    this.getPeople(event.pageIndex + 1);
  }


  ngOnInit() {
    this.getPeople(1);
    this.getTotalPeopleCount();
  }
  displayedColumns: string[] = ['id', 'name', 'url'];
  
}
