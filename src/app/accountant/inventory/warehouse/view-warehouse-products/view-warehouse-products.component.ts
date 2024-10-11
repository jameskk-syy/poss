import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-view-warehouse-products',
  templateUrl: './view-warehouse-products.component.html',
  styleUrls: ['./view-warehouse-products.component.sass']
})
export class ViewWarehouseProductsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'count',
    'item',
    'skuId',
    'skuCode',
    'unit',
    'updatedBy',
    'updatedOn',
    'actions'
  ];

  subscription!: Subscription;
  code:any;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;

  dataSource!: MatTableDataSource<any>;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private service: StockService,) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    this.getData(code);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getData(code: string) {
    this.isLoading = true;
    this.subscription = this.service.getProducts(code).subscribe(res => {
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
