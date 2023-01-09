import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { StarWarsDataService } from '../star-wars-data.service';
import { Planet } from '../interfaces';
import { MatTable } from '@angular/material/table';

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
  @ViewChild(MatTable) table?: MatTable<any>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: StarWarsDataService
            ) {}

  renderRows(){
    this.table?.renderRows();
  }

  getPlanets(): void {
    for (let i = 1; i < 7; i++) {
      this.dataService.getPlanets(i).subscribe(
        data => {this.planets.push(...data)
        this.planets.sort((a: Planet, b: Planet) => a.id - b.id)

        this.renderRows();
      });
    }
  }

  ngOnInit() {
    this.getPlanets();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];
}
