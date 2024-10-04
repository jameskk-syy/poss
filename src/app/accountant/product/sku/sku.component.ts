;import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AddSkuComponent } from '../forms/add-sku/add-sku.component';
import { DeleteSkuComponent } from '../forms/delete-sku/delete-sku.component';
import { EditSkuComponent } from '../forms/edit-sku/edit-sku.component';
@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.sass']
})
export class SkuComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'description',
    'price',
    'unit',
    'status',
    'createdOn',
    'action'
];

subscription!: Subscription;
data: any;
isdata: boolean = false;
isLoading:boolean = false;
roles:any;
dataSource!: MatTableDataSource<any>;
skus: any[] = [];

constructor(
  private router: Router, 
  private dialog: MatDialog,    
  private service: ProductService,) 
  
  { }

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

addSku(action:string){
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false
  dialogConfig.autoFocus = true
  dialogConfig.width = "600px"
  dialogConfig.data = {
    test: ""
  }
  const dialogRef = this.dialog.open(AddSkuComponent, dialogConfig);

    dialogRef.afterClosed().subscribe ({
    next:(value) => {
      this.ngOnInit()
    }
    });
  }



editSku(sku:any){

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false
  dialogConfig.autoFocus = true
  dialogConfig.width = "600px"
  dialogConfig.data = {
    sku:sku
  }
  console.log ('sku sku', dialogConfig.data)
  this.dialog.open(EditSkuComponent, dialogConfig)
  }


deleteSku(sku: any){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false
  dialogConfig.autoFocus = true
  dialogConfig.width = "500px"
  dialogConfig.data = {
    sku: sku
  }
  const dialogRef = this.dialog.open(DeleteSkuComponent, dialogConfig)

  dialogRef.afterClosed().subscribe ({
    next: (value) => {
      this.ngOnInit()
    },
  })
}

}
