import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-view-invoices',
  templateUrl: './view-invoices.component.html',
  styleUrls: ['./view-invoices.component.sass']
})
export class ViewInvoicesComponent implements OnInit {

  displayedColumns: string[]=[
    'invoiceNo',
    'description',
    'amount',
    'date',
    'status',
    'view items'    
  ]

  dataSource!: MatTableDataSource<any>;
  data: any;
  subscription!: Subscription;
  isdata: boolean = false;
  isLoading:boolean = false;
  customers: any [] = []
  salesPersonId: any;
  
  constructor(
    private invoiceService: InvoiceService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) { }

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.getData()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getData(){
    
    this.isLoading = true;
    this.subscription = this.invoiceService.getInvoices().subscribe({
      next:(res) => {
        this.data = res;
        console.log('invoces', res)
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


  confirmPaymentStatus(invoice:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      invoice: invoice
    }

    console.log('ghg', invoice)

    const dialogRef = this.dialog.open(ConfirmPaymentComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  viewItems(invoice:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      invoice: invoice
    }

    console.log('ghg', invoice)

    const dialogRef = this.dialog.open(ViewInvoicesComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }



}
