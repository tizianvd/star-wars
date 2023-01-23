import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film, DataTableElement } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film!: Film;
  loadedComponents: number = 0;
  tables: DataTableElement[] =   [ 
    {
                                name : "Planets",
                                field : "planets",
                                object_key : "planets",
                                data : [],
                                pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                                columns : 
                                        {'id' : {name: 'ID'}, 
                                        'name' : {name: 'Name'}, 
                                        'url' : {name: 'Details', url:['/planet-details/', 'id']}}
                },
                {
                                name : "Characters",
                                field : "people",
                                object_key : "characters",
                                data: [],
                                pagination : {length: 0, paginatorEnabled: true, pageSize: 5},
                                columns : 
                                      {'id' : {name: 'ID'}, 
                                      'name' : {name: 'Name'}, 
                                      'url' : {name: 'Details', url:['/person/', 'id']}}
                },
                {
                                name : "Species",
                                field : "species",
                                object_key : "species",
                                data: [],
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
                }
  ]

  constructor(
    private route: ActivatedRoute,
    private dataService: StarWarsDataService

  ){}

  getFilm() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("films", id)
    .subscribe(
      film => {
        this.film = film
        for (let table of this.tables) {
          this.getData(table);
        }

      }
    );
  }


  getData(dataTable: DataTableElement): void {
    this.dataService.getAllRecords(dataTable.field).subscribe({
      next: data => {
      data.forEach(element => {
        if (this.film[dataTable.object_key].includes(element.url)){
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
    this.getFilm();
  }
}
