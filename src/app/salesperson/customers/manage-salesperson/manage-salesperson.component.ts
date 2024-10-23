import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-manage-salesperson',
  templateUrl: './manage-salesperson.component.html',
  styleUrls: ['./manage-salesperson.component.sass']
})
export class ManageSalespersonComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'date',
    'action',
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;

  
  dataSource!: MatTableDataSource<any>;

  constructor(private router: Router, private dialog: MatDialog, private service: CustomersService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData() {
    this.isLoading = true;
    this.subscription = this.service.getCustomers().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.isLoading = false
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    })
  }

  addCountyCall() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "500px"
  //   dialogConfig.data = {
  //     test: ""
  //   }
  //   this.dialog.open(AddCountyComponent, dialogConfig)
   }

  // editCountyCall(County) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "500px"
  //   dialogConfig.data = {
  //     county: County
  //   }
  //   this.dialog.open(EditCountyComponent, dialogConfig)
  // }

  // deleteCountyCall(County) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "500px"
  //   dialogConfig.data = {
  //     county: County
  //   }
  //   this.dialog.open(DeleteCountyComponent, dialogConfig)
  // }
}

