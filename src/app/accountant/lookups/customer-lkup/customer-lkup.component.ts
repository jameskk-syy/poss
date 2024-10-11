import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from 'src/app/staff/sales/services/sales.service';
import { LookupsService } from '../lookups.service';
import { SalespersonComponent } from '../../salesperson/salesperson/salesperson.component';

@Component({
  selector: 'app-customer-lkup',
  templateUrl: './customer-lkup.component.html',
  styleUrls: ['./customer-lkup.component.sass']
})
export class CustomerLkupComponent implements OnInit {
  displayedColumns: string [] =[
    'code',
    'name',
    'address',
    'location',
    'phone',
    'status'
  ]

  dataSource!: MatTableDataSource<any>;
  salesPerson: any[] = []
  IsLoading: boolean;
  data: any;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
 

  constructor(
    private salespersonService: SalesService,
    private lookupsService: LookupsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<SalespersonComponent>
  ) { }
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getCustomerData()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCustomerData() {
    this.isLoading = true;
    this.subscription = this.lookupsService.getCustomers().subscribe({
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
          console.error('Error fetching stock data:', err);
          this.isdata = false;
        }
    })
  }

  onSelectCustomer(customer: any) {
    console.log(customer); 
    this.dialogRef.close({ customer: { name: customer.name, id: customer.id } });
  }
}
