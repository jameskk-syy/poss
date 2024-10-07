import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddStockComponent } from 'src/app/staff/stock/inventory/add-stock/add-stock.component';
import { WarehouseService } from '../../inventory/warehouse/warehouse.service';
import { LookupsService } from '../lookups.service';

@Component({
  selector: 'app-sku-lkup',
  templateUrl: './sku-lkup.component.html',
  styleUrls: ['./sku-lkup.component.sass']
})
export class SkuLkupComponent implements OnInit {

  displayedColumns: string []=[
    'id',
    'code',
    'name',
    'price',
    'unit'
  ]
  IsLoading: boolean;
  data: boolean;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  dataSource!: MatTableDataSource<any>;
  warehouses: any[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private lookupService: LookupsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<AddStockComponent>
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
  }


  getSkuData() {
    this.IsLoading = true;
    this.lookupService.getSkus().subscribe({next: (res: any) => {
        if (res.entity.length > 0) {
          this.IsLoading = false
          this.data  =true
          this.dataSource = new MatTableDataSource(res.entity)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.IsLoading = false
          this.data = false
          this.dataSource = new MatTableDataSource(null)
        }
      },
      error: (err) => {
        this.IsLoading = false
        this.data = false
        console.log("caught error is ", err)
        this.snackbar.showNotification('snackbar-danger', err)
      },
      complete: () => {}
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
