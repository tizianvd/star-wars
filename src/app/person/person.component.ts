import { Component, OnInit } from '@angular/core';
import { Person, Planet, DataTableElement } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: Person;
  homeworld?: Planet;
  loadedComponents: number = 0;
  tables: DataTableElement[] =   [ 
                {
                  name : "Species",
                  field : "species",
                  object_key : "species",
                  data : [],
                  pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                  columns : 
                          {'id' : {name: 'ID'}, 
                          'name' : {name: 'Name'}, 
                          'url' : {name: 'Details', url:['/species-details/', 'id']}}
                },
                {
                  name : "Starships",
                  field : "starships",
                  object_key : "starships",
                  data: [],
                  pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                  columns : 
                        {'id' : {name: 'ID'}, 
                        'name' : {name: 'Name'}, 
                        'url' : {name: 'Details', url:['/starship-details/', 'id']}}
                },
                {
                  name : "Vehicles",
                  field : "vehicles",
                  object_key : "vehicles",
                  data: [],
                  pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                  columns : 
                        {'id' : {name: 'ID'}, 
                        'name' : {name: 'Name'}, 
                        'url' : {name: 'Details', url:['/vehicle-details/', 'id']}}
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
                },
              ]

  constructor(
    private dataService: StarWarsDataService,
    private route: ActivatedRoute
    ){}

  getPerson() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("people", id)
    .subscribe(
      person => {
        this.person = person
        this.getHomeworld()
        for (let table of this.tables) {
          this.getData(table);
        }

      }
    );
  }

  getHomeworld() : void {
    this.dataService.getRecord("planets", this.dataService.getIDFromURL("planets", this.person?.homeworld))
    .subscribe(planet => this.homeworld = planet)
  }

  getData(dataTable: DataTableElement): void {
    this.dataService.getAllRecords(dataTable.field).subscribe({
      next: data => {
      data.forEach(element => {
        if (this.person[dataTable.object_key].includes(element.url)){
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
    this.getPerson();
  }

}
