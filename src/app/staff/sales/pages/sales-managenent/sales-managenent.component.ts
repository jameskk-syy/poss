import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales-managenent',
  templateUrl: './sales-managenent.component.html',
  styleUrls: ['./sales-managenent.component.sass']
})
export class SalesManagenentComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    "farmer_no",
    'username',
    'payment_mode',
    "quantity",
    "allocationAmount",
    "collectionAmount",
    "netPay",
    'action',
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
  constructor(private router: Router, private dialog: MatDialog, private service: SalesService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private routeData:any) {
      this.route = routeData.route
     }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  allSelected: boolean = false;

  selectAll(checked: boolean) {
  this.allSelected = checked;
  this.confirmed = 0
  this.dataSource.data.forEach((element,i) => {
  element.selected = checked;
  if(checked){
    this.confirmed += 1
  }else{
    this.confirmed = 0
  }
  });



  }

  handleApprove(){
    this.isLoading = true;
    this.service.updateApprovalStatus(this.confirmedRecords,this.route.id).subscribe(res=>{
      if(res.entity && res.entity.length){
        location.reload()
      }
    })
    console.log(this.confirmedRecords)
  }
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


  getData() {
    this.isLoading = true;
    const routeId = this.route.id;
    this.subscription = this.service.getFarmersPaymentRecordsPerRoute(routeId).subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        // Binding with the datasource
        this.totalQuantity = this.data.entity.reduce((val:number,object:any)=>object.quantity+val,0.0)
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.handleChange(this.method)

      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource<any>(this.data);
      }
    })
  }

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
    this.getData();
  }

  pay(){
    
  }




}


