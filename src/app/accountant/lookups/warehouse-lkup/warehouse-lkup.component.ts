import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { WarehouseService } from '../../inventory/warehouse/warehouse.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStockComponent } from '../../inventory/stock/form/add-stock/add-stock.component';
import { LookupsService } from '../lookups.service';

@Component({
  selector: 'app-warehouse-lkup',
  templateUrl: './warehouse-lkup.component.html',
  styleUrls: ['./warehouse-lkup.component.sass']
})
export class WarehouseLkupComponent implements OnInit {

  displayedColumns: string []=[
    'id',
    'code',
    'name',
    'status'
  ]
  IsLoading: boolean;
  data: any;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  dataSource!: MatTableDataSource<any>;
  warehouses: any[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private lookupsService: LookupsService,
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
    // this.getWarehouseData()
    this.getWarehouseData()
  }


  getWarehouseData() {
    this.isLoading = true;
      this.subscription = this.lookupsService.getWarehouses().subscribe(res => {
        this.data = res;
        console.log ('Warehouse are here', this.data)
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
          this.dataSource = new MatTableDataSource<any>(this.data);
        }
      })
   }

   onSelectWarehouse(warehouse: any) {
    console.log(warehouse); 
    this.dialogRef.close({ warehouse: { name: warehouse.name, whseCode: warehouse.code } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource) {
      this.dataSource.filter = filterValue;
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage(); 
      }
    } else {
      console.error('Data source is not initialized.');
    }
  }

}



