import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalesService } from '../../services/sales.service';
import { DashboardService } from 'src/app/staff/dashboard/services/dashboard.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AddAccumulationsComponent } from '../add-accumulations/add-accumulations.component';

@Component({
  selector: 'app-totals-collections',
  templateUrl: './totals-collections.component.html',
  styleUrls: ['./totals-collections.component.sass']
})
export class TotalsCollectionsComponent implements OnInit {
  filterform: FormGroup
  today: Date = new Date();
  formattedDate: string = this.today.toISOString().slice(0, 10);
  date: any;
  fromDate: any;
  toDate: any;
  form: FormGroup;
  selected = "";
  selectedvalue = "";
  milkQuantity: any = 0.0;
  damount: any = 0.0;
  datasize:any=0
  filename = "totalscollections for " + this.today;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  displayedColumns: string[] = [
    'id',
    "collectorId",
    'milkQuantity',
    "accumulatorId",
    "routeFk",
    "collectionDate",
  ];

  currentDate: any

  subscription!: Subscription;
  data: any;
  isdata: boolean = false;
  isLoading: boolean = false;
  accumulatorId: any;
  collectorId: any;
  constructor(
    private router: Router, private datePipe: DatePipe, private fb: FormBuilder, private dialog: MatDialog, private service: SalesService, private dashboard: DashboardService,
    private snackbar: SnackbarService) {
  }
  addCall() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "65%"
    dialogConfig.data = {
      test: ""
    }
    const dialogRef = this.dialog.open(AddAccumulationsComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      this.getData()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCurrentDate(): any {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  onSelectionChange() {
    switch (this.selected) {
      case 'current_date':
        // this.getTodaysData()
        break;
        case 'all':
          this.getData()
      default:
        break;

    }
  }

  getData() {
    this.isLoading = true;
    this.getAllCollectionsSummary()
    this.subscription = this.service.getAllAccumulations().subscribe(res => {
      this.data = res;
      if (this.data.entity.length > 0) {
        this.isLoading = false;
        this.isdata = true;
        this.datasize=this.data.entity.length
        this.dataSource = new MatTableDataSource(this.data.entity);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        this.isdata = false;
        this.dataSource = new MatTableDataSource(null);
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
    this.selected = 'current_date'
    this.form = this.fb.group({
    collectorId: [""],
     accumulatorId: [""]

    });
  }
 

  filterByCollectorId(Id:any) {
    let collectorId = this.form.value.collectorId

    if (collectorId != null && collectorId != undefined) {
      this.isLoading = true;
      this.getSummaryPerCollector(collectorId)
    
      this.subscription = this.service.getCollectorsIdAccumulations(collectorId).subscribe(res => {
        this.data = res;
        if (this.data.entity.length > 0) {
          this.isLoading = false
          this.isdata = true;
          this.datasize=this.data.entity.length
          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.isdata = false;
          this.isLoading = false
          this.dataSource = new MatTableDataSource(null);
        }
      })
    }
  }
  
  getSummaryPerCollector(collectorId) {
    this.isLoading = true;
    this.subscription = this.dashboard.getCollectorsIdAccumulations(collectorId).subscribe(res => {
      this.data = res;
      if (this.data && this.data.entity.length > 0) {
        this.isLoading = false;
                let totalMilkQuantity = 0;
        let totalAmount = 0;
          for (const entity of this.data.entity) {
          totalMilkQuantity += entity.milkQuantity;
          totalAmount += entity.amount;
        }
          this.milkQuantity = totalMilkQuantity;
        this.damount = totalAmount;
      }
    });
  }
  

  filterByAccumulatorId(Id:any) {
    let accumulatorId = this.form.value.accumulatorId

    if (accumulatorId != null && accumulatorId != undefined) {
      this.isLoading = true;
      this.getSummaryPerAccumulator(accumulatorId)
    
      this.subscription = this.service.getAccumulationsByAccumulatorId(accumulatorId).subscribe(res => {
        this.data = res;
        if (this.data.entity.length > 0) {
          this.isLoading = false
          this.isdata = true;
          this.datasize=this.data.entity.length
          this.dataSource = new MatTableDataSource(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        else {
          this.isdata = false;
          this.isLoading = false
          this.dataSource = new MatTableDataSource(null);
        }
      })
    }
  }
  getSummaryPerAccumulator(accumulatorId) {
    this.isLoading = true;
    
    this.subscription = this.dashboard.getAccumulationsByAccumulatorId(accumulatorId).subscribe(res => {
      this.data = res;
      if (this.data && this.data.entity.length > 0) {
        this.isLoading = false;
          let totalMilkQuantity = 0;
        let totalAmount = 0;
          for (const entity of this.data.entity) {
          totalMilkQuantity += entity.milkQuantity;
          totalAmount += entity.amount;
        }
  
        this.milkQuantity = totalMilkQuantity;
        this.damount = totalAmount;
      }
    },(err)=>console.log(err));
  }
  
    getAllCollectionsSummary() {
      this.isLoading = true;
    
      this.subscription = this.dashboard.getAllAccumulations().subscribe(res => {
        this.data = res;
        if (this.data && this.data.entity.length > 0) {
          this.isLoading = false;
              let totalMilkQuantity = 0;
          let totalAmount = 0;
              for (const entity of this.data.entity) {
            totalMilkQuantity += entity.milkQuantity;
            totalAmount += entity.amount;
          }
              this.milkQuantity = totalMilkQuantity;
          this.damount = totalAmount;
        }
      });
    }
    
  


}
