import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductSaleService } from '../service/product-sale.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductSaleComponent } from '../add-product-sale/add-product-sale.component';
import { ViewSalesPersonComponent } from '../view-sales-person/view-sales-person.component';

@Component({
  selector: 'app-product-sales-management',
  templateUrl: './product-sales-management.component.html',
  styleUrls: ['./product-sales-management.component.sass']
})
export class ProductSalesManagementComponent implements OnInit {
  filterform: FormGroup
  selected = "";

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };


  displayedColumns: string[] = [
    'id',
    "salesPersonName",
    "email",
    "mobile",
    "status",
    'action',
  ];
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;

  constructor(
    private salesservice: ProductSaleService,
    private dialog: MatDialog,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.filterform = this.fb.group({
      spName: [''],
      spEmail: [''],
      spMobile: [''],
    })
    this.getData()
  }

  getData() {
    this.selected = ""
    this.isLoading = true
    this.isdata = false
    this.salesservice.fetchSalesPersons().subscribe(res => {
      this.data = res
      this.isLoading = false

      if (res.userData.length > 0) {
        this.isdata = true
       
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(res.userData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.isLoading = false
        this.isdata = false
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
  
    })
  }

  addCall(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      sales: ""
    };
    const dialogRef = this.dialog.open(AddProductSaleComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(res=>{
      this.getData()
    })
  }



  getSalesPersonByName(){
    const code = this.filterform.value.sales_code;
    this.salesservice.fetchSalesBySalesCode(code).subscribe(res=>{
      
      this.data.entity = this.data.entity.filter(d=>d.id==res.entity.id);
      this.dataSource = new MatTableDataSource(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  viewSalesPersonDetails(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      salesPerson: data
    }

    const dialogRef = this.dialog.open(ViewSalesPersonComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  getSalesPersonByEmail(){

  }
  getSalesPersonByMobile(){}
}
