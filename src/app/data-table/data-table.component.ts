import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {
  @Input() tableData: any;
  @Input() columns: any;

  dataSource: any;
  objectKeys = Object.keys;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
  }
}
