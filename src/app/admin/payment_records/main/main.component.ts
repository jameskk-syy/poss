import { Component, ElementRef, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { ProductSaleService } from './service/product-sale.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
// import { SalesService } from 'src/app/staff/sales/services/sales.service';

@Component({
  selector: 'app-main-management',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 
  displayedColumns: string[] = [
    'id',
    "farmer_no",
    'username',
    'payment_mode',
    "quantity",
    "allocationAmount",
    "collectionAmount",
    "netPay",
    'status',
  ];

  paymentOption: FormGroup;
  method:string ='mpesa';

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading:boolean = false;
  route: any;
  confirmed: number = 0;
  confirmedRecords = []
  totalQuantity: number = 0.0;
  constructor(
    private fb: FormBuilder) {
      // this.route = routeData.route
     }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 

  // handleApprove(){
  //   this.isLoading = true;
  //   const staffId = JSON.parse(localStorage.getItem('auth-user')).id;
  //   this.service.updateApprovalStatus(this.confirmedRecords,this.route.id,staffId).subscribe(res=>{
  //     console.log(res)
  //     // if(res.entity && res.entity.length){
  //     //   location.reload()
  //     // }
  //   })
  //   console.log(this.confirmedRecords)
  // }
  handleChange(selected:string){
    this.method = selected;
    const data = this.data.entity.filter((v:any)=> v.payment_mode.toLowerCase()==this.method.toLowerCase())
    this.totalQuantity = data.reduce((val:number,object:any)=>object.quantity+val,0.0)
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleCheck(checked:boolean,req:any){
    if (checked) {
      this.confirmedRecords.push(req)
    }else{
      this.confirmedRecords = this.confirmedRecords.filter(r=>r.farmer_no != req.farmer_no)
    }
    this.confirmed = this.confirmedRecords.length;
  }


  // getData() {
  //   this.isLoading = true;
  //   const staffId = JSON.parse(localStorage.getItem('auth-user')).id;

  //   this.subscription = this.service.getApprovedPaymentRecords(staffId).subscribe(res => {
  //     this.data = res;
  //     if (this.data.entity && this.data.entity.length > 0) {
  //       this.isLoading = false;
  //       this.isdata = true;
  //       this.confirmed = res.entity.length;
  //       // Binding with the datasource
  //       this.totalQuantity = this.data.entity.reduce((val:number,object:any)=>object.quantity+val,0.0)
  //       this.dataSource = new MatTableDataSource(this.data.entity);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;

  //       this.handleChange(this.method)

  //     }
  //     else {
  //       this.isdata = false;
  //       this.dataSource = new MatTableDataSource<any>(this.data);
  //     }
  //   },err=>{
  //     this.isdata = false;
  //     this.isLoading = false;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;      
  //     this.dataSource = new MatTableDataSource<any>(null);
  //   })
  // }

  dataSource!: MatTableDataSource<any>;

  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
    this.paymentOption = this.fb.group({
      method:[this.method,[Validators.required]]
    })
    // this.getData();
  }

  isStage1Verified(row:any){
    return row.clerk1.startsWith('Y') || row.clerk2.startsWith('Y')
  }

  // pay(){
  //   this.isLoading = true;
  //   const staffId = JSON.parse(localStorage.getItem('auth-user')).id;
  //   console.log(this.data.entity)
  //   this.service.initiatePayment(this.data.entity).subscribe(res=>{
  //     console.log(res)
  //     // if(res.entity && res.entity.length){
  //     //   location.reload()
  //     // }
  //   })
  // }

}
