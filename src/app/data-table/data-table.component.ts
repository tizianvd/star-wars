import { Component, Output, Input, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnChanges {
  @Input() tableData: any;
  @Input() columns: any;
  @Input() pagination: any;

  @Output() pageEvent = new EventEmitter;

  @ViewChild(MatTable) table?: MatTable<any>;

  dataSource: any;
  objectKeys = Object.keys;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableData);
    if (this.pagination) {
      this.pagination.paginatorEnabled = true;
    }
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.paginatorEnabled = false;
    this.pageEvent.emit(event.pageIndex + 1);
  }
}
