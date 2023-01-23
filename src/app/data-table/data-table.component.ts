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
  @Input() isStatic: boolean = false;
  @Input() addEmptyRows: boolean = false;

  @Output() pageEvent = new EventEmitter;

  @ViewChild(MatTable) table?: MatTable<any>;

  dataSource: any;
  objectKeys = Object.keys;

  reloadData() {
    if (this.addEmptyRows) {
      for (let i = 0; i <= this.pagination.length % this.pagination.pageSize; i++) {
        this.tableData.push(Object.create(null))
      }
    }
    this.dataSource = new MatTableDataSource(this.pagination && this.pagination.pageSize > 0 ? this.tableData.slice(this.pagination.currentPage * this.pagination.pageSize, (this.pagination.currentPage + 1) * this.pagination.pageSize) : this.tableData);
  }
  ngOnChanges() {
    if (this.pagination) {
      if (!this.pagination.currentPage) {
        this.pagination.currentPage = 0;
      }
      this.pagination.paginatorEnabled = true
    }

    this.reloadData()
  }

  handlePageEvent(event: PageEvent) {
    this.pagination.currentPage = event.pageIndex; 
    this.pageEvent.emit(event.pageIndex + 1);
    if (this.isStatic) {
      this.reloadData();
    } else {
      this.pagination.paginatorEnabled = false;
    }
  }
}
