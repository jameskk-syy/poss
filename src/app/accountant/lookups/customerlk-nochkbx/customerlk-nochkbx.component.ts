import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from 'src/app/staff/sales/services/sales.service';
import { LookupsService } from '../lookups.service';
import { CreateInvoiceComponent } from '../../invoice/form/create-invoice/create-invoice.component';

@Component({
  selector: 'app-customerlk-nochkbx',
  templateUrl: './customerlk-nochkbx.component.html',
  styleUrls: ['./customerlk-nochkbx.component.sass']
})
export class CustomerlkNochkbxComponent implements OnInit {

  displayedColumns: string [] =[
    'code',
    'name',
    'address',
    'location',
    'phone',
    'status'
  ]

  selectedCustomers: Set<number> = new Set();
  dataSource!: MatTableDataSource<any>;
  salesPerson: any[] = []
  IsLoading: boolean;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  selection: { [key: string]: boolean } = {}; 
  customer: any 
  allChecked: boolean = false 
  selectedSp:any
  id: any;
  
 

  constructor(
    private salespersonService: SalesService,
    private lookupsService: LookupsService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<CreateInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    console.log("jhfdjhkfdgsafjhhgjgdfgjh,khgasddfghjm", this.data)
    this.selectedSp = this.data
    
      console.log("this sp", this.selectedSp)
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
    const id = this.selectedSp

    this.subscription = this.lookupsService.getCustomersp(id).subscribe({
      next:(res: any) => {
        const data = res;
        console.log('custommm', res)
          if (data.entity.length > 0) {
            this.isLoading = false;
            this.isdata = true;
            // Binding with the datasource
            this.dataSource = new MatTableDataSource(data.entity);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          } else {
            this.isLoading = false;
            this.dataSource = new MatTableDataSource<any>(data);
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
    this.dialogRef.close({ customer: { name: customer.name, id: customer.id, code:customer.code } });
  }

}
