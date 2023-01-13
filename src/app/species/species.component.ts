import { Component, OnInit } from '@angular/core'
import { Species } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  loaded: boolean = false;
  species: Species[] = [];
  pagination = {length: 0, paginatorEnabled: true};
  columns = {
    'id' : {name: 'ID'},
    'name' : {name: 'Name'},
    'url' : {name: 'Details', url: ['/person/','id']},
  }


  constructor(private dataService: StarWarsDataService){}


  getSpecies(page: number): void {
    this.dataService.getPage("species", page).subscribe(data => {
      this.species = data;
      this.species.sort((a: Species, b: Species) => a.id - b.id)
      this.getSpeciesCount();
    });
  }

  getSpeciesCount() {
    this.dataService.getRecordCount("species").subscribe({
      next: (count: number) => {this.pagination.length = count},
      complete: () => (this.loaded = true),
    });
  }

  handlePageEvent(newPage: any) {
    this.getSpecies(newPage);
  }

  ngOnInit(): void {
    this.getSpecies(1);
  }
}
