import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { StarWarsDataService } from '../star-wars-data.service';
import { Planet } from '../planet';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  planets: Planet[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: StarWarsDataService
            ) {}

  // getPlanets() {
  //   return this.dataService.getPlanets().
  //   pipe(map(response => ({
  //     count: response.name,
  //   }))).
  //   subscribe(response => console.log(response))
  // }

  getPlanets(): void {
    this.planets = this.dataService.getPlanets();
  }

  ngOnInit() {
    this.getPlanets();
  }

}
