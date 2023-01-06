import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StarWarsDataService } from '../star-wars-data.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  people: any = [];
  @ViewChild(MatTable) table?: MatTable<any>;


  constructor(
    private breakpointObserver: BreakpointObserver,
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
        this.renderRows();
        
     });
    }
  }

  ngOnInit() {
    this.getPeople();
  }
  displayedColumns: string[] = ['id', 'name', 'url'];
  
}
