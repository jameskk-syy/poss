import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockService } from 'src/app/accountant/inventory/stock/stock.service';
import { WarehouseService } from 'src/app/accountant/inventory/warehouse/warehouse.service';
import { WarehousesService } from '../warehouses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.sass']
})
export class WarehouseDetailsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'item',
    'skuCode',
    'count',
    'unit',
    'price',      
    'updatedBy',
    'updatedOn',
    'actions',
  ];

  userId:String;
  warehouseData:any;
  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;

  dataSource!: MatTableDataSource<any>;
  WarehouseCode: any;

  constructor(private spwarehouses: WarehousesService, private tokenService: TokenStorageService, private snackbar: SnackbarService, private route: ActivatedRoute, private dialog: MatDialog,private warehouse:WarehouseService, private service: StockService,) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.loadUserId();
     this.getWarehouseCode()
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUserId(){
    const user = this.tokenService.getUser();
    this.userId = user?.id;
    console.log('userId',this.userId);
  }

  getWarehouseCode(): void {
    console.log('userId',this.userId)
    if (this.userId) {
      this.spwarehouses.getWhseCode(this.userId).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.WarehouseCode = res.entity?.whseCode;
          console.log('Warehouse Code:', this.WarehouseCode);
          this.getDetails(this.WarehouseCode)
          this.getData(this.WarehouseCode)
        },
        error: (err) => {
          this.isLoading = false;
          this.snackbar.showNotification('snackbar-danger', err);
        }
      });
    } else {
      console.error('User ID is not available.');
    }
  }

  getDetails(code:string){
    this.isLoading = true
    
     this.subscription = this.warehouse.getDetails(code).subscribe({
        next: (res: any) => {       
            this.isLoading = false;
            this.warehouseData = res.entity; 
            this.snackbar.showNotification('snackbar-success', res.message)
        },
        error: (err) => {
          this.isLoading = false;
          this.snackbar.showNotification('snackbar-danger', err)
        },
        complete: () => {}
    })
  }

  getData(code: string) {
    this.isLoading = true;
    this.subscription = this.service.getProducts(this.WarehouseCode).subscribe(res => {
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

  edit(warehouse: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      action: "edit",
      wh: warehouse
    }
    // this.dialog.open(AddDialogComponent, dialogConfig).afterClosed().subscribe({
    //   next: (res: any) => {
    //     this.ngOnInit()
    //   }
    // })
  }

  delete(warehouse: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      action: "edit",
      wh: warehouse
    }
    // this.dialog.open(WarehouseDelComponent, dialogConfig).afterClosed().subscribe({
    //   next: (res: any) => {
    //     this.ngOnInit()
    //   }
    // })
  }

  assign(warehouse: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      action: "edit",
      wh: warehouse
    }
    // this.dialog.open(AssignWarehouseComponent, dialogConfig).afterClosed().subscribe({
    //   next: (res: any) => {
    //     this.ngOnInit()
    //   }
    // })
  }  

}

