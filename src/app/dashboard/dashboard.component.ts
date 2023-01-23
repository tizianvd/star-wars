import { Component, OnInit } from '@angular/core';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(private dataService: StarWarsDataService) {}
  searchPhrase: string = "";

  search() : void {
    this.dataService.search("people", "luke")
    .subscribe(
      film => {
        console.log(film)

      }
    );
  }

  onType(event: Event) {
    console.log(this.searchPhrase);
  }

  ngOnInit(): void {
    //this.search();
  }
}
