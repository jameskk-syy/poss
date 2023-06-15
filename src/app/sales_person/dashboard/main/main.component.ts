import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { ProductSaleService } from './service/product-sale.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddProductSaleComponent } from './add-product-sale/add-product-sale.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-main-management',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
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
    "salesCode",
    "customerName",
    "productName",
    "amount",
    "quantity",
    "paymentStatus",
    'action',
  ];
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  customers: any;
  currentUserId:any

  constructor(
    private salesservice: ProductSaleService,
    private dialog: MatDialog,
    private snackBarService:SnackbarService,
    private fb:FormBuilder,
    ) { }

  ngOnInit(): void {
    this.filterform = this.fb.group({
      sales_code: ['']
    })
    this.getData()
    this.fetchCustomers()
  }
  fetchCustomers() {
    this.isLoading = true
    this.isdata = false
    this.salesservice.fetchCustomers().subscribe(res => {
      this.data = res
      this.isLoading = false
      if (res.entity.length > 0) {
        this.isdata = true
     
        this.customers = res.entity;

      } else {
        this.isLoading = false
        this.isdata = false
      }
    })
  }

  getData() {
    this.currentUserId = JSON.parse(localStorage.getItem('auth-user')).id
    this.selected = ""
    this.isLoading = true
    this.isdata = false
    this.salesservice.fetchAllSalesBySalesPersonFk(this.currentUserId).subscribe(res => {
      this.data = res
      this.isLoading = false
      if (res.entity.length > 0) {
        this.isdata = true
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(res.entity.sort((a,b)=>b.id-a.id));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.isLoading = false
        this.isdata = false
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
  
    })
  }
  fetchCustomerByCustomerId(customerFk: any): string {
    const customer = this.customers && this.customers.find(c=>c.id==customerFk)
    let name: string='';
    if(customer){
      name = customer.firstname+' '+customer.lastname;
    }
    return name;
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



  getSalesBySalesCode(){
    const code = this.filterform.value.sales_code;
    this.salesservice.fetchSalesBySalesCode(code).subscribe(res=>{
      
      this.data.entity = this.data.entity.filter(d=>d.id==res.entity.id);
      this.dataSource = new MatTableDataSource(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }
  generateReceipt(salesCode){
    this.isLoading = true
    this.salesservice.generateReceipt({
      salesCode,
      salesPersonFk:this.currentUserId
    })
    .subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `${salesCode}-sales_receipt.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.isLoading = false
      this.getData();
      
    },(error) => {
      this.isLoading = false;
      this.snackBarService.showNotification(error,"snackbar-red")
    });
  }
}
