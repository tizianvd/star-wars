import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Starship, DataTableElement } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';

@Component({
  selector: 'app-starship-details',
  templateUrl: './starship-details.component.html',
  styleUrls: ['./starship-details.component.css']
})
export class StarshipDetailsComponent {
  starship!: Starship;
  loadedComponents: number = 0;
  tables: DataTableElement[] =   [ 
    {
                                name : "Pilots",
                                field : "people",
                                object_key : "pilots",
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

    
  getStarship() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("starships", id)
    .subscribe(
      starship => {
        this.starship = starship
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
        if (this.starship[dataTable.object_key].includes(element.url)){
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
    this.getStarship();
  }
}
