import { Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SalespersonService } from '../salesperson.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddCustomersComponent } from '../form/add-customers/add-customers.component';
import { EditCustomersComponent } from '../form/edit-customers/edit-customers.component';

@Component({
  selector: 'app-manage-sp-customers',
  templateUrl: './manage-sp-customers.component.html',
  styleUrls: ['./manage-sp-customers.component.sass']
})
export class ManageSpCustomersComponent implements OnInit {

  displayedColumns: string [] =[
    'id',
    'code',
    'name',
    'address',
    'location',
    'phone',
    'status',
    'customerDetails',
    'actions'
  ]

  dataSource!: MatTableDataSource<any>;
  data: any;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  customers: any [] = []
  salesPersonId: any;
  
  


  constructor(
    private salespersonService: SalespersonService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    // const salesPersonId = this.route.snapshot.paramMap.get('id')

    this.route.params.subscribe(params => {
      this.salesPersonId = params['id'];
      console.log("salesperson", this.salesPersonId);
    })

    this.getData(this.salesPersonId)

  }
  
  getData(salesPersonId){
    
    this.isLoading = true;
    this.subscription = this.salespersonService.getCustomers(salesPersonId).subscribe({
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

  viewCustomersDetails(customer){
    this.router.navigate([`salesperson/customer-details`, customer.id])
  }

  addCustomer(salesPersonId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = {
      salesPersonId: salesPersonId
    }
    console.log('SALES', salesPersonId)
    const dialogRef = this.dialog.open(AddCustomersComponent, dialogConfig);

      dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
      });

  }

  editCustomer(customer, salesPersonId){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "600px"
    dialogConfig.data = {
      customer:customer,
      salesPersonId:salesPersonId
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
