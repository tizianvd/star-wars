import { Component, OnInit } from '@angular/core';
import { Species, Planet, Person, Film, DataTableElement } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.css']
})
export class SpeciesDetailsComponent implements OnInit {
  species!: Species;
  homeworld?: Planet;
  loadedComponents: number = 0;
  tables: DataTableElement[] =   [ 
    {
                                name : "People",
                                field : "people",
                                object_key : "people",
                                data : [],
                                pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                                columns : 
                                        {'id' : {name: 'ID'}, 
                                        'name' : {name: 'Name'}, 
                                        'url' : {name: 'Details', url:['/person/', 'id']}}
                },
                {
                                name : "Films",
                                field : "films",
                                object_key : "films",
                                data: [],
                                pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                                columns : 
                                      {'id' : {name: 'ID'}, 
                                      'title' : {name: 'Title'}, 
                                      'url' : {name: 'Details', url:['/film-details/', 'id']}}
                }
  ]

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

    getSpecies() : void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.dataService.getRecord("species", id)
      .subscribe(
        species => {
          this.species = species
          this.getHomeworld();
          for (let table of this.tables) {
            this.getData(table);
          }

        }
      );
    }

    getHomeworld() : void {
      this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.species?.homeworld))
      .subscribe({
        next: planet => {this.homeworld = planet},
      })
    }

    getData(dataTable: DataTableElement): void {
      this.dataService.getAllRecords(dataTable.field).subscribe({
        next: data => {
        data.forEach(element => {
          if (this.species[dataTable.object_key].includes(element.url)){
            dataTable.data.push(element);
            dataTable.data.sort((a: any, b: any) => a.id - b.id)
            dataTable.pagination.length = dataTable.data.length
  
          }
        });
        
        }, 
        complete: () => {
          this.loadedComponents++;
          }
        });
    }

    ngOnInit(): void {
      this.getSpecies();
    }
}
