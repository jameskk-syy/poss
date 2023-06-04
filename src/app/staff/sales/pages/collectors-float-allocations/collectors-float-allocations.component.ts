import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { DeleteFloatAllocationComponent } from '../delete-float-allocation/delete-float-allocation.component';
import { EditFloatAllocationComponent } from '../edit-float-allocation/edit-float-allocation.component';
import { FloatAllocationComponent } from '../float-allocation/float-allocation.component';
import { MilkAllocationComponent } from '../milk-allocation/milk-allocation.component';

@Component({
  selector: 'app-collectors-float-allocations',
  templateUrl: './collectors-float-allocations.component.html',
  styleUrls: ['./collectors-float-allocations.component.sass']
})
export class CollectorsFloatAllocationsComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    "collector",
    'floatAmount',
    'amountSpent',
    "balance",
    'date',
    'action',
  ];

  displayedColumns1: string[] = [
    'id',
    "salesPersonName",
    'allocatedMilkQuantity',
    'availableMilkQuantity',
    "balance",
    'date',
    'action',
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  constructor(private router: Router, private dialog: MatDialog, private service: SalesService,) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.floatDatasource.filter = filterValue.trim().toLowerCase();

    if (this.floatDatasource.paginator) {
      this.floatDatasource.paginator.firstPage();
    }
  }


  applyMilkAllocationFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.milkDatasource.filter = filterValue.trim().toLowerCase();

    if (this.milkDatasource.paginator) {
      this.milkDatasource.paginator.firstPage();
    }
  }


  milkDatasource!: MatTableDataSource<any>;
  floatDatasource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData();
    this.fetchMilkAllocations()
  }


  //MILK ALLOCATION

  addMilkAllocationCall() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(MilkAllocationComponent, dialogConfig)

  }

  fetchMilkAllocations(){
    this.isLoading = true;
    this.service.fetchMilkAllocations().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.milkDatasource = new MatTableDataSource(this.data.entity);
        this.milkDatasource.paginator = this.paginator;
        this.milkDatasource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.milkDatasource = new MatTableDataSource<any>(null);
      }
    })
  }



  // Float allocation

  getData() {
    this.isLoading = true;
    this.service.getCollectorAllocations().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.floatDatasource = new MatTableDataSource(this.data.entity);
        this.floatDatasource.paginator = this.paginator;
        this.floatDatasource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.floatDatasource = new MatTableDataSource<any>(null);
      }
    })
  }

  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(FloatAllocationComponent, dialogConfig)
  }

  editCall(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      float: row
    }
    this.dialog.open(EditFloatAllocationComponent, dialogConfig)
  }

  deleteCall(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      float: row
    }
    this.dialog.open(DeleteFloatAllocationComponent, dialogConfig)
  }
}