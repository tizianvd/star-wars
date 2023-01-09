import { Component, ViewChild, OnInit } from '@angular/core'
import { Species } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  loaded: boolean = false;
  species: Species[] = [];
  totalSpeciesCount: number = 0;
  displayedColumns: string[] = ['id', 'name', 'url'];
  paginatorEnabled: boolean = true;
  @ViewChild(MatTable) table?: MatTable<any>;

  constructor(private dataService: StarWarsDataService){}

  renderRows() {
    this.table?.renderRows();
  }

  getSpecies(page: number): void {
    this.dataService.getPage("species", page).subscribe(data => {
      this.species = data;
      this.species.sort((a: Species, b: Species) => a.id - b.id)
      this.renderRows();
      this.paginatorEnabled = true;
    });
  }

  getSpeciesCount() {
    this.dataService.getRecordCount("species").subscribe({
      next: (count: number) => {this.totalSpeciesCount = count},
      complete: () => (this.loaded = true),
    });
  }

  handlePageEvent(event: PageEvent) {
    this.paginatorEnabled = false;
    this.getSpecies(event.pageIndex + 1);
  }

  ngOnInit(): void {
    this.getSpecies(1);
    this.getSpeciesCount();
  }
}
