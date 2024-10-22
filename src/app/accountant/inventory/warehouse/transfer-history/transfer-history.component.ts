import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from '../../stock/stock.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { WarehouseDelComponent } from '../warehouse-del/warehouse-del.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WarehouseLkupComponent } from 'src/app/accountant/lookups/warehouse-lkup/warehouse-lkup.component';
@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.sass']
})
export class TransferHistoryComponent  implements OnInit {

  warehouseSelected = false;
  fromDate:any;
  toDate:any;
  whseCode:any;
  warehouse:any;
  currentDate: any;
  form: FormGroup;
  selected = "";
  loading: boolean = false
  data: boolean = false
  dataSource: MatTableDataSource<any>

  displayedColumns: any = ['id', 'fromWhse','toWhse', 'item','skuCode','quantity', 'description', 'movedBy', 'createdOn']

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  selectedWhseCode: any;

  constructor( private datePipe: DatePipe, private service: StockService, private snackbar: SnackbarService, private dialog: MatDialog,private router: Router, private fb:FormBuilder) { 
   
  }

  ngOnInit(): void {
    this.getAll()
    this.form = this.fb.group({
      whseName: [""],
       startDate: [""],
       endDate: [""],
       combinedWhseName: [""],
       combinedStartDate: [""],
       combinedEndDate:   [""],
      });
  }  

  getAll() {
    this.loading = true;
    this.service.getMasterHistory().subscribe({
      next: (res: any) => {
        if (res.entity.length > 0) {
          this.loading = false
          this.data  =true

          console.log("data retrieved is ", res)

          this.dataSource = new MatTableDataSource(res.entity)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        } else {
          this.loading = false
          this.data = false

          this.dataSource = new MatTableDataSource(null)
        }
      },
      error: (err) => {
        this.loading = false
        this.data = false
        console.log("caught error is ", err)
        this.snackbar.showNotification('snackbar-danger', err)
      },
      complete: () => {}
    })
  }


onSelectionChange() {
  if (this.selected === 'whseName') {
    this.selectWarehouse();
  } else if (this.selected === 'all') {
    this.filterByDateandWhse();
  }
}

selectWarehouse() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  dialogConfig.data = {
   
  };

  const dialogRef = this.dialog.open(WarehouseLkupComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.warehouse = result.warehouse;
      console.log ('results war',this.warehouse)

      this.form.patchValue({
        whseName: this.warehouse.name,
        whseCode: this.warehouse.whseCode
      });

        this.whseCode = this.warehouse.whseCode
        console.log ('warehouse',this.whseCode)
    }
  
    this.service.getBywhseCode(this.whseCode).subscribe({
      next: (res: any) => this.handleResponse(res),
      error: (err) => this.handleError(err),
    });
  });
}
  
filterByDate() {
  this.fromDate = this.datePipe.transform(this.form.value.startDate, 'yyyy-MM-dd');
  this.toDate = this.datePipe.transform(this.form.value.endDate, 'yyyy-MM-dd');
  this.loading = true;

  console.log(this.fromDate,this.toDate);
  this.service.getByDateRange(this.fromDate,this.toDate).subscribe({
    next: (res: any) => this.handleResponse(res),
    error: (err) => this.handleError(err),
    complete: () => {}
  });
}

 openWarehouseLookup() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";

  const dialogRef = this.dialog.open(WarehouseLkupComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.warehouse = result.warehouse;
      console.log('Selected warehouse:', this.warehouse);

      this.form.patchValue({
        combinedWhseName: this.warehouse.name,
        whseCode: this.warehouse.whseCode
      });

      this.whseCode = this.warehouse.whseCode;
      this.warehouseSelected = true; 

      console.log('Warehouse code:', this.whseCode);

      this.fromDate = this.datePipe.transform(this.form.value.combinedStartDate, 'yyyy-MM-dd');
      this.toDate = this.datePipe.transform(this.form.value.combinedEndDate, 'yyyy-MM-dd');

      if (this.fromDate && this.toDate) {
        this.filterByDateandWhse(); 
      }
    }
  });
}

filterByDateandWhse() {
  this.fromDate = this.datePipe.transform(this.form.value.combinedStartDate, 'yyyy-MM-dd');
  this.toDate = this.datePipe.transform(this.form.value.combinedEndDate, 'yyyy-MM-dd');

  if (!this.fromDate || !this.toDate) {
    this.snackbar.showNotification('snackbar-danger', 'Please provide both start and end dates.');
    return;
  }

  if (!this.whseCode) {
    this.snackbar.showNotification('snackbar-danger', 'Please select a warehouse.');
    return;
  }

  this.loading = true;
  this.service.getByCodeandRange(this.whseCode,this.fromDate, this.toDate ).subscribe({
    next: (res: any) => this.handleResponse(res), 
    error: (err) => this.handleError(err),
    complete: () => { this.loading = false; }
  });
}


private handleResponse(res: any): void {
  this.loading = false;
  if (res.entity && res.entity.length > 0) {
    this.data = true;
    console.log("Data retrieved is:", res);

    this.dataSource = new MatTableDataSource(res.entity);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } else {
    this.data = false;
    this.dataSource = new MatTableDataSource(null);
  }
}

private handleError(err: any): void {
  this.loading = false;
  this.data = false;
  console.log("Caught error is:", err);
  this.snackbar.showNotification('snackbar-danger', err);
}

  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh(){
    this.ngOnInit()
    this.selected = ""
  }

}
