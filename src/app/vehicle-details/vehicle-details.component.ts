import { Component, OnInit } from '@angular/core';
import { Vehicle, DataTableElement } from '../interfaces';
import { StarWarsDataService } from '../star-wars-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  vehicle!: Vehicle;
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

  getVehicle() : void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getRecord("vehicles", id)
    .subscribe(
      vehicle => {
        this.vehicle = vehicle
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
        if (this.vehicle[dataTable.object_key].includes(element.url)){
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
    this.getVehicle();
  }
}
