import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WarehousesService } from '../warehouses.service';
import { RequestStockComponent } from '../request-stock/request-stock.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-stock-requisition',
  templateUrl: './stock-requisition.component.html',
  styleUrls: ['./stock-requisition.component.sass']
})
export class StockRequisitionComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'item',
    'fromWhse',
    'toWhse',
    'message',
    'quantity',
    'requestBy',
    'createdOn',
    'status',
    'approvedFlag',
];

subscription!: Subscription;
isdata: boolean = false;
isLoading:boolean = false;
roles:any;
data:boolean = false;
dataSource!: MatTableDataSource<any>;
requests: any[] = [];
form:FormGroup;

constructor(
  private router: Router, 
  private dialog: MatDialog,    
  private service: WarehousesService,
  private fb: FormBuilder,
  private snackBar: SnackbarService
  ) 
  
  { }

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
@ViewChild("filter", { static: true }) filter: ElementRef;
@ViewChild(MatMenuTrigger)
contextMenu: MatMenuTrigger;
contextMenuPosition = { x: "0px", y: "0px" };

ngOnInit(): void {
  this.form = this.fb.group({
    approval: [""],
  })
  this.getData();
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


getData() {
  
  this.isLoading = true;
  this.service.getRequisitions().subscribe({
    next: (res: any) => {
      if (res.entity.length > 0) {
        this.isLoading = false
        this.data  =true

        console.log("data retrieved is ", res)

        this.dataSource = new MatTableDataSource(res.entity)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      } else {
        this.isLoading = false
        this.data = false

        this.dataSource = new MatTableDataSource(null)
      }
    },
    error: (err) => {
      this.isLoading = false
      this.data = false
      console.log("caught error is ", err)
      this.snackBar.showNotification('snackbar-danger', err)
    },
    complete: () => {}
  })
}

    addRequest() {
      const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = false
      dialogConfig.autoFocus = true
      dialogConfig.width = "1000px"
      dialogConfig.data = {
        request: ""
      }
  
      const dialogRef = this.dialog.open(RequestStockComponent, dialogConfig)
      dialogRef.afterClosed().subscribe((res)=> {
        this.getData()
      })
    }
  
    filterByApproval() {
      this.isLoading = true

      const approvalValue = this.form.get('approval')?.value;

      this.subscription = this.service.getByApproval(approvalValue)
        .subscribe({
          next:(res) => {
          this.snackBar.showNotification('snackbar-success', 'Successful!');
          this.isLoading = false;
          this.form.reset();
        },
         error: (err) => {
            this.isLoading = false;
            this.snackBar.showNotification('snackbar-danger', err);
                }
    });
    }

}



