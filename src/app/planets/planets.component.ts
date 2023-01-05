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

  planets: any = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: StarWarsDataService
            ) {}

  getPlanets(): void {
    this.dataService.getPlanets().subscribe(data => this.planets = data);
  }

  ngOnInit() {
    this.getPlanets();
  }

}
