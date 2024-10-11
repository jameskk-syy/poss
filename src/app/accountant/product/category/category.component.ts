import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { AddCategoryComponent } from '../forms/add-category/add-category.component';
import { DeleteCategoryComponent } from '../forms/delete-category/delete-category.component';
import { nextTick } from 'process';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'name',
    'code',
    'description',
    'status',
    'createdBy',
    'updatedBy',
    'createdOn',
    'action'
  ];

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;
  roles:any;
  dataSource!: MatTableDataSource<any>;
  categories: any[] = [];

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
      this.subscription = this.service.getCategories().subscribe({
        next:(res) => {
          this.data = res;
        console.log ('categories are here', this.data)
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

  addCategory(action:string){
    if (action === 'add'){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = {
      action:action,
      test: ""
    }
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig);

      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
    }
  }

  

  editCategory(category:any, action:string){

    if (action === 'edit') {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = {
      action:action,
      category:category
    }
    this.dialog.open(AddCategoryComponent, dialogConfig)
    }
  }

  deleteCategory(category: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      category: category
    }
    const dialogRef = this.dialog.open(DeleteCategoryComponent, dialogConfig)

    dialogRef.afterClosed().subscribe ({
      next: (value) => {
        this.ngOnInit()
      },
    })
  }

}


