import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PriceService } from '../price.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPriceComponent } from '../forms/add-price/add-price.component';
// import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';
// import { ViewCustomerComponent } from '../view-customer/view-customer.component';
// import { UpdateCustomerComponent } from '../update-customer/update-customer.component';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent implements OnInit {

  filterform: FormGroup
  selected = "";

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;

  displayedColumns: string[] = [
    'id',
    'fromDate',
    "toDate",
    "price",
    "status",
   
  ];

  constructor(
    private fb: FormBuilder, private priceservice: PriceService,
    private dialog: MatDialog
  ) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.filterform = this.fb.group({
      price: [""],
    })

    this.getData()
  }


  getData() {
    this.selected = ""
    this.isLoading = true
    this.isdata = false
    this.priceservice.fetchPrices().subscribe(res => {
      this.data = res

      this.isLoading = false
      if (res.entity && res.entity.length > 0) {
        this.isdata = true
        // Binding with the datasource
        this.dataSource = new MatTableDataSource(res.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.isLoading = false
        this.isdata = false
        this.dataSource = new MatTableDataSource<any>(this.data);
      }

    },err=>{
        this.isLoading = false
        this.isdata = false
        this.dataSource = new MatTableDataSource<any>(this.data);
    })
  }

  addCall() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "1000px"
    dialogConfig.data = {
      price: ""
    }

    const dialogRef = this.dialog.open(AddPriceComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  filterPrices() {

  }

  getPriceByPrice() {
    let price = this.filterform.value.price
  }

  // editCall(data: any) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "60%"
  //   dialogConfig.data = {
  //     customer: data
  //   }

  //   const dialogRef = this.dialog.open(UpdateCustomerComponent, dialogConfig)
  //   dialogRef.afterClosed().subscribe((res)=> {
  //     this.getData()
  //   })
  // }

  // deleteCall(data: any) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "40%"
  //   dialogConfig.data = {
  //     customer: data
  //   }

  //   const dialogRef = this.dialog.open(DeleteCustomerComponent, dialogConfig)
  //   dialogRef.afterClosed().subscribe((res)=> {
  //     this.getData()
  //   })
  // }

  // viewCustomerDetails(data: any) {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false
  //   dialogConfig.autoFocus = true
  //   dialogConfig.width = "60%"
  //   dialogConfig.data = {
  //     customer: data
  //   }

  //   const dialogRef = this.dialog.open(ViewCustomerComponent, dialogConfig)
  //   dialogRef.afterClosed().subscribe((res)=> {
  //     this.getData()
  //   })
  // }

  viewCustomerPurchases() {

  }

  customerDetailsCall() {

  }

}
