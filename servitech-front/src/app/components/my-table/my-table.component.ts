import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  @Input("datasource") datasource: MatTableDataSource<any>;
  @Input("columns") columns: any;
  @Input("length") length: number;
  @Input("paginator") paginator: string;
  @Input("search") search: boolean = false;
  @Input("isLoadingResults") isLoadingResults: boolean;
  @Input("placeholder") placeholder: string;
  @Input("label") label: string;
  @Input("pagesizeoptions") pageSizeOptions: any;  
  @Input("filter") filter: boolean = true;
  @Input("url") url: boolean;
  @Input("urlName") urlName: string;
  @Input("pagesize") pageSize: number;
  @Output() changePaginator = new EventEmitter();
  @Output() changeFilter = new EventEmitter();
  @Output() changeSort = new EventEmitter();
  @Output() deleteItems = new EventEmitter();
  @Output() visibilityReviewItems = new EventEmitter();
  @Output() editItems = new EventEmitter();
  @Output() addItems = new EventEmitter();
  @Output() historialItems = new EventEmitter();
  @Output() downloadItems = new EventEmitter();
  @Output() userItems = new EventEmitter();
  @Output() resultsItems = new EventEmitter();
  @Output() resultsokItems = new EventEmitter();
  @Output() viewItems = new EventEmitter();
  @Output() createMaintenanceItems = new EventEmitter();
  @Output() outputInternalItems = new EventEmitter();
  @Output() inputInternalItems = new EventEmitter();
  @Output() eventCheckbox = new EventEmitter();
  displayedColumns: any = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  pageEvent(event) {
    this.changePaginator.emit(event);
  }

  changeFilters(value) {
    this.changeFilter.emit(value);
  }

  sortData(value) {
    //console.log("value: ", value)
    this.changeSort.emit(value);
  }
  createMaintenanceItem(item){
    this.createMaintenanceItems.emit(item);
  }
  inputInternalItem( item ){
    this.inputInternalItems.emit ( item );
  }
  outputInternalItem( item ){
    this.outputInternalItems.emit ( item );
  }
  deleteItem(item) {
    this.deleteItems.emit(item);
  }
  visibilityReviewItem(item) {
    this.visibilityReviewItems.emit(item);
  }
  resultsItem(item) {
    this.resultsItems.emit(item);
  }
  resultsokItem(item) {
    this.resultsokItems.emit(item);
  }
  viewItem(item) {
    this.viewItems.emit(item);
  
  }
  editItem(item) {
    this.editItems.emit(item);
  }
  addItem(item) {
    this.addItems.emit(item);
  }
  historialItem(item) {
    this.historialItems.emit(item);
  }
  downloadItem(item) {
    this.downloadItems.emit(item);
  }
  userItem(item) {
    this.userItems.emit(item);
  }

  eventCheck(item) {
    this.eventCheckbox.emit(item);
  }
}
