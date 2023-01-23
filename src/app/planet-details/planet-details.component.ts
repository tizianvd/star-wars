import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planet, DataTableElement } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.css']
})

export class PlanetDetailsComponent implements OnInit {

  planet!: Planet;
  loadedComponents: number = 0;
  tables: DataTableElement[] =   [ 
    {
                                name : "Residents",
                                field : "people",
                                object_key : "residents",
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
    private route: ActivatedRoute,
    ) {  }


  getPlanet() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("planets", id)
    .subscribe(
      planet => {this.planet = planet

      for (let table of this.tables) {
          this.getData(table);
      }
  });
  }

  getData(dataTable: DataTableElement): void {
    this.dataService.getAllRecords(dataTable.field).subscribe({
      next: data => {
      data.forEach(element => {
        if (this.planet[dataTable.object_key].includes(element.url)){
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
    this.getPlanet();
  }

  displayedColumns: string[] = ['id', 'name', 'url'];

}
