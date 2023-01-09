import { Component, ViewChild } from '@angular/core';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';
import { Person } from '../interfaces';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  people: any = [];
  loaded: boolean = false;
  @ViewChild(MatTable) table?: MatTable<any>;


  constructor(
    private dataService: StarWarsDataService
            ) {}

  renderRows() {
    this.table?.renderRows();
  }

  getPeople(): void {
    for (let i = 1; i < 8; i++)
    {
      this.dataService.getPeople(i).subscribe(data => {
        this.people.push(...data);
        this.people.sort((a: Person, b: Person) => a.id - b.id)
        this.renderRows();
        this.loaded = true;
        
     });
    }
  }

  ngOnInit() {
    this.getPeople();
  }
  displayedColumns: string[] = ['id', 'name', 'url'];
  
}
