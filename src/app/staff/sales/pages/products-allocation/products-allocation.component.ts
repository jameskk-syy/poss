import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { SalesService } from '../../services/sales.service';
import { AdvanceDetailsComponent } from '../advance-details/advance-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FarmerData } from 'src/app/staff/sms/initiate-bulk-sms/initiate-bulk-sms.component';
import { HttpParams } from '@angular/common/http';

  
@Component({
  selector: 'app-products-allocation',
  templateUrl: './products-allocation.component.html',
  styleUrls: ['./products-allocation.component.scss']
})
export class ProductsAllocationComponent implements OnInit {
filterform:FormGroup
selected="";


  displayedColumns: string[] = [
    "farmerNo",
    "farmerNo",
    "username",
    "paymentMode",
    "advanceAmount",
    "date",
    
    "paymentMode",
    "advanceAmount",
    "date",
    
  ];
  
subscription!: Subscription;
  

  dataSource!: MatTableDataSource<any>;
  dataSource1!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  // fb: any;
  isLoading: boolean;
  // service: any;
  data: any;
  isdata: boolean;
  salesservice: any;
  // fb: any;
  
 
 
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private service: SalesService,
  ) { }

  ngOnInit(): void {
    this.filterform= this.fb.group({
      farmerNo: [""],
      // farmer: ["", Validators.required],
      // paymentMode: ["", Validators.required],
      // advance: ["", Validators.required],
      // paymentDate: ["", Validators.required],
    })
    this.getData();
  }
  getData() {
    this.selected = "";
    this.isLoading = true;
      this.service.getAdvance(this.data).subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    },error => {
      console.log('An error occurred:', error)
      
    })
  }


  
 

  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      test: ""
    }
    const dialogRef = this.dialog.open(AdvanceDetailsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }
  
  // getFarmerByFarmerNo(){
  //   this.isLoading = true;
  //   let farmerNo=this.filterform.value.farmerNo
  //   console.log(this.filterform.value.farmerNo)
      
  //   if (farmerNo != null && farmerNo != undefined ) {
  
  getFarmerByFarmerNo(){
    this.isLoading = true;
    let farmerNo=this.filterform.value.farmerNo
    console.log(this.filterform.value.farmerNo)
      
    if (farmerNo != null && farmerNo != undefined ) {
  
      const params = new HttpParams().set('farmerNo', farmerNo);
      this.subscription = this.service.getFarmerByFarmerNo(farmerNo).subscribe(res => {
              this.data = res;
        console.log(this.data.entity)
        if (this.data.entity!=null) {
          let result = []
          result.push(this.data.entity)
         
      const params = new HttpParams().set('farmerNo', farmerNo);
      this.subscription = this.service.getFarmerByFarmerNo(farmerNo).subscribe(res => {
              this.data = res;
        console.log(this.data.entity)
        if (this.data.entity!=null) {
          let result = []
          result.push(this.data.entity)
         
          this.isLoading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        // else {
        //   this.isdata = false;
        else {
          this.isdata = false;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(null);
          this.dataSource = new MatTableDataSource(null);
        }
      })
    }
      })
    }
  }

  

  


  readMessage(message) {
    this.snackbar.showNotification("snackbar-success", message);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  
}
