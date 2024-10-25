import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AddCustomersComponent } from '../forms/add-customers/add-customers.component';
import { EditCustomersComponent } from '../forms/edit-customers/edit-customers.component';
import { CustomersService } from '../customers.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.sass']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[]= [
    'id',
    'code',
    'name',
    'location',
    'phone',
    'alt_phone',
    'status',
    'category',
    'action'
  ]
  dataSource!: MatTableDataSource<any>;
  isLoading: Boolean;
  isdata: any;
  subscription!: Subscription;
  data: any;
  loggedInUserId: any;

  constructor(
    private dialog: MatDialog,
    private customerService: CustomersService,
    private tokenStorageService: TokenStorageService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    
    this.loggedInUserId = this.tokenStorageService.getUserId();
    console.log('user Id', this.loggedInUserId )

    this.getData();
  }

  
  getData(){
    
    this.isLoading = true;
    console.log(this.loggedInUserId)
    this.subscription = this.customerService.getCustomers(this.loggedInUserId).subscribe({
      next:(res) => {
        this.data = res;
        console.log('custommm', res)
          if (this.data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            // Binding with the datasource
            this.dataSource = new MatTableDataSource(this.data.entity);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  addCustomer(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "900px"
    
    const dialogRef = this.dialog.open(AddCustomersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });

  }

  editCustomer(customer){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "900px"
    dialogConfig.data = {
      customer:customer,
      
    }

    console.log('cust', customer)
    const dialogRef = this.dialog.open(EditCustomersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });
  }

}
