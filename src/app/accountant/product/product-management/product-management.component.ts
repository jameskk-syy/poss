import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AddProductComponent } from '../forms/add-product/add-product.component';
import { DeleteProductComponent } from '../forms/delete-product/delete-product.component';
import { EditProductComponent } from '../forms/edit-product/edit-product.component';
import { error } from 'console';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.sass']
})
export class ProductManagementComponent implements OnInit {

  displayedColumns: string[] = [
      'id',
      'code',
      'name',
      'description',
      'category',
      'status',
      'createdBy',
      'action'
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  dataSource!: MatTableDataSource<any>;
  products: any[] = [];

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
      this.subscription = this.service.getProducts().subscribe({
        next:(res) =>{
          this.data = res;
        console.log ('products are here', this.data)
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
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error fetching stock data:', err);
          this.isdata = false;
          }
       
        })
      }
  

  addProduct(){
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = {
      test: ""
    }
    const dialogRef = this.dialog.open(AddProductComponent, dialogConfig);

      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
    }
  

  editProduct(product:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = {
      product:product
    }
    this.dialog.open(EditProductComponent, dialogConfig)
    }
  
  

  deleteProduct(product: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      product: product
    }
    const dialogRef = this.dialog.open(DeleteProductComponent, dialogConfig)

    dialogRef.afterClosed().subscribe ({
      next: (value) => {
        this.ngOnInit()
      },
    })
  }
}



