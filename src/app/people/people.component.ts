import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { StarWarsDataService } from '../star-wars-data.service';

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
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: StarWarsDataService
            ) {}

  getPeople(): void {
    for (let i = 0; i < 7; i++)
      this.dataService.getPlanets(i).subscribe(data => this.people.push(...data));
  }

  ngOnInit() {
    this.getPeople();
  }
  

  
}
