import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCustomerComponent } from '../forms/add-customer/add-customer.component';
import { DeleteCustomerComponent } from '../forms/delete-customer/delete-customer.component';
import { ViewCustomerComponent } from '../forms/view-customer/view-customer.component';
import { UpdateCustomerComponent } from '../forms/update-customer/update-customer.component';
import { ApproveCustomerComponent } from '../forms/approve-customer/approve-customer.component';


@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.sass']
})

export class ManageCustomersComponent implements OnInit {

  filterform: FormGroup
  selected = "";
  data: any;
  isdata: boolean = true;
  isLoading: boolean = true;

  displayedColumns: string[] = [
    
    'id',
    "code",
    "name",
    "location",
    "phone",  
    "status",
    "approved",
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private fb: FormBuilder, private customerservice: CustomerService,
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
      customer_no: [""],
    })

    this.getData()
  }

  
  getData() {
    this.selected = ""
    this.isLoading = true
    this.isdata = false
    this.customerservice.fetchCustomers().subscribe({
      next: (res) => {
        this.isLoading = false
        if (res.entity && res.entity.length > 0) {
          this.isLoading = false;
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
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching customer data:', err);
        this.isdata = false;
      }

      })
  }


  addCall() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "1000px"
    dialogConfig.data = {
      customer: ""
    }

    const dialogRef = this.dialog.open(AddCustomerComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  filterCustomers() {

  }

  getCustomerByCustomerNo() {
    let farmerNo = this.filterform.value.farmer_no
  }

  editCall(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      customer: data
    }

    const dialogRef = this.dialog.open(UpdateCustomerComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  deleteCall(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      customer: data
    }

    const dialogRef = this.dialog.open(DeleteCustomerComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  viewCustomerDetails(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      customer: data
    }

    const dialogRef = this.dialog.open(ViewCustomerComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  approveCustomer(customer:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      customer: customer
    }

    console.log('ghg', customer)

    const dialogRef = this.dialog.open(ApproveCustomerComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  


  customerDetailsCall() {

  }

}
