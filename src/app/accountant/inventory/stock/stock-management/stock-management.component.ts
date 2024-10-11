import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { subscribeOn, Subscription } from 'rxjs';
import { StockService } from '../stock.service';
import { AddStockComponent } from '../form/add-stock/add-stock.component';
import { EditStockComponent } from '../form/edit-stock/edit-stock.component';
import { DeleteStockComponent } from '../form/delete-stock/delete-stock.component';

@Component({
  selector: 'app-stock-management',
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.sass']
})
export class StockManagementComponent implements OnInit {

  displayedColumns: string [] = [
    'id',
    'item',
    'skuCode',
    'skuId',
    'count',
    'action'

  ]

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  dataSource!: MatTableDataSource<any>;
  stocks: any[] = []

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private service: StockService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData()
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
    this.subscription = this.service.getStock().subscribe({
      next:(res) => {
        this.data = res;
        console.log('stocksss', res)
          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            // Binding with the datasource
            this.dataSource = new MatTableDataSource(this.data.entity);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<any>(this.data);
          }
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching stock data:', err);
          this.isdata = false;
        }
    })
  }

  addStock(action: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = { 
      action:action
    }
    console.log('action is create',action)
  

    const dialogRef = this.dialog.open(AddStockComponent, dialogConfig);
      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
    }

    removeStock(stock: any, action: string){
      if (action === 'add' || action === 'remove') {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false
        dialogConfig.autoFocus = true
        dialogConfig.width = "600px"
        dialogConfig.data = {
          stock:stock,
          action:action
        }
        console.log('action is here',action)
        console.log('action is here',stock)

        const dialogRef = this.dialog.open(AddStockComponent, dialogConfig);
      };
      }


}