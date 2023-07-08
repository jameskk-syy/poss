import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ManageCustomersComponent } from '../../customers/manage-customers/manage-customers.component';
import { MatTableDataSource } from '@angular/material/table';
import { AddProductSaleComponent } from '../add-product-sale/add-product-sale.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { ProductSaleService } from '../service/product-sale.service';

@Component({
  selector: 'app-view-sales-person',
  templateUrl: './view-sales-person.component.html',
  styleUrls: ['./view-sales-person.component.sass']
})
export class ViewSalesPersonComponent implements OnInit {

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
  ];
  isdata: boolean = false;
  isLoading: boolean = false;
  salesPersonName:string;
  customers: any;
  currentUserId:any

  constructor(
    private salesservice: ProductSaleService,
    private dialog: MatDialog,
    private snackBarService:SnackbarService,
    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.filterform = this.fb.group({
      sales_code: ['']
    })
    this.getData()
    this.fetchCustomers()
    this.salesPersonName = this.data.salesPerson.username;
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
    this.currentUserId = this.data.salesPerson.id
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
    // this.salesservice.generateReceipt({
    //   salesCode,
    //   salesPersonFk:this.currentUserId
    // })
    // .subscribe((response: Blob) => {
    //   const url = window.URL.createObjectURL(response);
    //   const a = document.createElement('a');
    //   document.body.appendChild(a);
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = `${salesCode}-sales_receipt.pdf`;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    //   document.body.removeChild(a);
    //   this.isLoading = false
    //   this.getData();
      
    // },(error) => {
    //   this.isLoading = false;
    //   this.snackBarService.showNotification(error,"snackbar-red")
    // });
  }

}
