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
import { ProductService } from '../../product/product.service';

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
  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  dataSource!: MatTableDataSource<any>;
  skus: any[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private lookupService: LookupsService,
    private service: ProductService,
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
    this.getSkuData()
  }


  getSkuData() {
    this.isLoading = true;
      this.subscription = this.service.getSkus().subscribe(res => {
        this.data = res;
        console.log ('Skus are here', this.data)
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
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectSku(sku: any) {
    console.log(sku); 
    this.dialogRef.close({ sku: { name: sku.name, id: sku.id, code:sku.code } });
  }

}
